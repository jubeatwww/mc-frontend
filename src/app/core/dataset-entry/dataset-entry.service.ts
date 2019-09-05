import { Injectable } from '@angular/core';
import sidebarItems from './dataset-entry.json';

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
      datasets_id: [1, 2],
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
    {
      id: 2,
      name: 'Agricultural Use 2',
      dbName: 'argicultural_use_2',
      timeInterval: TimeInterval.MONTH,
      data: [
        { time: '1995/01', Production: 1.87, Export: 8.81, YAYA: 90 },
        { time: '1995/02', Production: 1.7, Export: 8.82, YAYA: 91 },
        { time: '1995/03', Production: 1.72, Export: 8.73, YAYA: 93 },
        { time: '1995/04', Production: 1.89, Export: 8.84, YAYA: 100 },
        { time: '1995/05', Production: 1.94, Export: 8.95, YAYA: 88 },
        { time: '1995/06', Production: 1.88, Export: 8.89, YAYA: 78 },
        { time: '1995/07', Production: 1.87, Export: 8.81, YAYA: 90 },
        { time: '1995/08', Production: 1.82, Export: 8.9, YAYA: 66 },
      ],
    },
  ];
  sidebarItems = sidebarItems;
  constructor() {
  }

  getDatasetsByCategory(category_id: string | number) {
    let category: Category = null;
    if (typeof category_id === 'string') {
      category = this.categories.find(c => c.dbName === category_id);
    } else if (typeof category_id === 'number') {
      category = this.categories.find(c => c.id === category_id);
    }

    const datasets_id = category ? category.datasets_id : null;
    return datasets_id.map(id =>
      this.datasets.find(d => id === d.id)
    );
  }
}
