export class SpreadSheet {
	constructor(
		public readonly data: (string | number)[][],
		public readonly rows: (string | number)[],
		public readonly columns: (string | number)[],
	) { }
}
