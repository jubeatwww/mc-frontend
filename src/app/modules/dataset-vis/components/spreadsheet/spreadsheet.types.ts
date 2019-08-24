export interface SpreadSheetGrid {
	row: number;
	column: number;
}

export type SpreadSheetRange = [number, number];

export interface SpreadSheetSelectedGridRange {
	start: SpreadSheetGrid;
	current: SpreadSheetGrid;
	row: SpreadSheetRange;
	column: SpreadSheetRange;
}

export interface SpreadSheet {
	columns: (string | number)[];
	rows: (string | number)[];
	data: (string | number)[][]
}
