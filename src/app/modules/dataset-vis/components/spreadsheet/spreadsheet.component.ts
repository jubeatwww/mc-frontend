import { Component, OnInit, Input, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { SpreadSheet } from '@@modules/dataset-vis/models/spreadsheet';

interface SpreadSheetGrid {
  row: number;
  column: number;
}

type SpreadSheetRange = [number, number];

interface SpreadSheetSelectedGridRange {
  start: SpreadSheetGrid;
  current: SpreadSheetGrid;
  row: SpreadSheetRange;
  column: SpreadSheetRange;
}

type SelectingType = 'GRID' | 'ROW' | 'COLUMN';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpreadsheetComponent implements OnInit {
  @Input() spreadsheet: SpreadSheet;

  private selectedGridRange?: SpreadSheetSelectedGridRange;
  private selectingType?: SelectingType;

  constructor() { }

  ngOnInit() { }

  private isInRange(range: SpreadSheetRange, value: number) {
    return value >= range[0] && value <= range[1];
  }

  private resolveRange(range1, range2): [number, number] {
    return [
      Math.min(range1, range2),
      Math.max(range1, range2)
    ];
  }

  @HostListener('document:mouseup')
  onSelectingEnd() {
    if (this.selectingType) {
      this.selectingType = undefined;
    }
  }

  onGridSelectStart(grid: SpreadSheetGrid) {
    const { row, column } = grid;

    this.selectingType = 'GRID';
    this.selectedGridRange = {
      start: grid,
      current: grid,
      row: [row, row],
      column: [column, column]
    };
  }

  onGridSelect(grid: SpreadSheetGrid) {
    if (!this.selectingType) {
      return;
    }

    const { row, column } = grid;

    if (this.selectingType === 'GRID') {
      this.selectedGridRange = {
        ...this.selectedGridRange,
        current: grid,
        row: this.resolveRange(this.selectedGridRange.start.row, row),
        column: this.resolveRange(this.selectedGridRange.start.column, column)
      };
    } else if (this.selectingType === 'ROW') {
      this.onRowSelect(row);
    } else if (this.selectingType === 'COLUMN') {
      this.onColumnSelect(column);
    }
  }

  onRowSelectStart(row: number) {
    const column = this.spreadsheet.columns.length - 1;

    this.selectingType = 'ROW';
    this.selectedGridRange = {
      start: { row, column: 0 },
      current: { row, column },
      row: [row, row],
      column: [0, column]
    };
  }

  onRowSelect(row: number) {
    if (!this.selectingType) {
      return;
    }

    this.selectedGridRange = {
      ...this.selectedGridRange,
      current: {
        ...this.selectedGridRange.current,
        row,
      },
      row: this.resolveRange(this.selectedGridRange.start.row, row),
    };
  }

  onColumnSelectStart(column: number) {
    const row = this.spreadsheet.rows.length - 1;

    this.selectingType = 'COLUMN';
    this.selectedGridRange = {
      start: { row: 0, column },
      current: { row, column },
      row: [0, row],
      column: [column, column]
    };
  }

  onColumnSelect(column: number) {
    if (!this.selectingType) {
      return;
    }

    this.selectedGridRange = {
      ...this.selectedGridRange,
      current: {
        ...this.selectedGridRange.current,
        column,
      },
      column: this.resolveRange(this.selectedGridRange.start.column, column),
    };
  }

  onSelectAll() {
    const row = this.spreadsheet.rows.length - 1;
    const column = this.spreadsheet.columns.length - 1;

    this.selectedGridRange = {
      start: { row: 0, column: 0 },
      current: { row, column },
      row: [0, row],
      column: [0, column]
    };
  }

  getGridClass(grid: SpreadSheetGrid) {
    const { row, column } = grid;
    const selected = this.isGridSelected(grid);
    const className = { selected };

    if (selected && this.selectedGridRange) {
      className['top-boundary'] = row === this.selectedGridRange.row[0];
      className['bottom-boundary'] = row === this.selectedGridRange.row[1];
      className['left-boundary'] = column === this.selectedGridRange.column[0];
      className['right-boundary'] = column === this.selectedGridRange.column[1];
    }

    return className;
  }

  isRowSelected(row: number) {
    if (!this.selectedGridRange) {
      return false;
    }

    return this.isInRange(this.selectedGridRange.row, row);
  }

  isColumnSelected(column: number) {
    if (!this.selectedGridRange) {
      return false;
    }

    return this.isInRange(this.selectedGridRange.column, column);
  }

  isGridSelected({ row, column }: SpreadSheetGrid) {
    return (
      this.isRowSelected(row) &&
      this.isColumnSelected(column)
    );
  }
}
