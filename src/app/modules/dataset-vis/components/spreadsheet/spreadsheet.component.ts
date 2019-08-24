import { Component, OnInit, Input, HostListener, ChangeDetectionStrategy } from '@angular/core';
import {
  SpreadSheetGrid,
  SpreadSheetRange,
  SpreadSheetSelectedGridRange,
  SpreadSheet
} from './spreadsheet.types';

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpreadsheetComponent implements OnInit {
  @Input() spreadsheet: SpreadSheet;

  private selectedGridRange?: SpreadSheetSelectedGridRange;
  private selecting = false;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('document:mouseup')
  mouseUpOutside() {
    if (this.selecting) {
      this.selecting = false;
    }
  }

  onGridMouseDown(grid: SpreadSheetGrid) {
    const { row, column } = grid;

    this.selecting = true;
    this.selectedGridRange = {
      start: grid,
      current: grid,
      row: [row, row],
      column: [column, column]
    };
  }

  onGridMouseEnter(grid: SpreadSheetGrid) {
    if (!this.selecting) {
      return;
    }

    const { row, column } = grid;

    this.selectedGridRange = {
      ...this.selectedGridRange,
      current: grid,
      row: this.resolveRange(this.selectedGridRange.start.row, row),
      column: this.resolveRange(this.selectedGridRange.start.column, column)
    };
  }

  onGridMouseUp() {
    this.selecting = false;
  }

  onRowSelect(row: number) {
    const column = this.spreadsheet.columns.length - 1;

    this.selectedGridRange = {
      start: { row, column: 0 },
      current: { row, column },
      row: [row, row],
      column: [0, column]
    };
  }

  onColumnSelect(column: number) {
    const row = this.spreadsheet.rows.length - 1;

    this.selectedGridRange = {
      start: { row: 0, column },
      current: { row, column },
      row: [0, row],
      column: [column, column]
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

  selectAll() {
    const row = this.spreadsheet.rows.length - 1;
    const column = this.spreadsheet.columns.length - 1;

    this.selectedGridRange = {
      start: { row: 0, column: 0 },
      current: { row, column },
      row: [0, row],
      column: [0, column]
    };
  }

  private isInRange(range: SpreadSheetRange, value: number) {
    return value >= range[0] && value <= range[1];
  }

  private resolveRange(range1, range2): [number, number] {
    return [
      Math.min(range1, range2),
      Math.max(range1, range2)
    ];
  }
}
