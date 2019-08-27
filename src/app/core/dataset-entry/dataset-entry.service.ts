import { Injectable } from '@angular/core';

interface Database {
  id: number;
  name: string;
  dbName: string;
}

interface ValueChain {
  id: number;
  databaseId: number;
  categoriesId: number[];
  name: string;
  dbName: string;
}

interface Category {
  id: number;
  name: string;
  dbName: string;
  datasets_id: number[];
}

enum TimeInterval {
    YEAR,
    MONTH,
    QUARTER,
}

interface Dataset {
  id: number;
  name: string;
  dbName: string;
  timeInterval: TimeInterval;
  data: Object[];
}

@Injectable({
  providedIn: 'root'
})
export class DatasetEntryService {
  databases: Database[] = [
    {
      id: 1,
      name: 'Wheat',
      dbName: 'wheat',
    },
  ];
  valueChain: ValueChain[] = [
    {
      id: 1,
      databaseId: 1,
      categoriesId: [1],
      name: 'Input Suppliers',
      dbName: 'input_suppliers',
    },
  ];
  categories: Category[] = [
    {
      id: 1,
      name: 'Fertilizer Input (by nutrient)',
      dbName: 'fertilizer_input_by_nutrient',
      datasets_id: [1],
    },
  ];
  datasets: Dataset[] = [
    {
      id: 1,
      name: 'Agricultural Use',
      dbName: 'argicultural_use',
      timeInterval: TimeInterval.YEAR,
      data: [
        { time: '1995', test: 1.87, WTF: 8.88 },
        { time: '1996', test: 1.88, WTF: 8.87 },
        { time: '1997', test: 1.89, WTF: 8.8877 },
        { time: '1998', test: 1.89, WTF: 7.77 },
      ],
    },
  ];

  constructor() { }
}
