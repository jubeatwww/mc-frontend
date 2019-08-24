import { SpreadSheet } from '../models/spreadsheet';

const rows = [
	1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
	2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
	2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020
];
const columns = [
	'AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH', 'II', 'JJ',
	'KK', 'LL', 'MM', 'NN', 'OO', 'PP', 'QQ', 'RR', 'SS', 'TT',
	'UU', 'VV', 'WW', 'XX', 'YY', 'ZZ'
];
const data = (() => (
	Array.from({ length: rows.length }).map(() => (
		Array.from({ length: columns.length }).map(() => (
			Math.floor(Math.random() * columns.length)
		))
	))
))()

export const mockSpreadSheet = new SpreadSheet(data, rows, columns);
