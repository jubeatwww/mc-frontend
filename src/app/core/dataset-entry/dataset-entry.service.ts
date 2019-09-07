import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as sidebarItems from './dataset-entry.json';
import { DatasetDetail } from './dto/dataset-detail.dto.js';
import { Dataset } from './dto/dataset.dto.js';

@Injectable({
  providedIn: 'root'
})
export class DatasetEntryService {

  sidebarItems = sidebarItems;

  baseUrl = 'http://34.80.167.207:3002/api';
  constructor(private http: HttpClient) { }

  getValueChain() {
    return this.http.get<Object[]>(`${this.baseUrl}/value-chain`);
  }

  getCategory(category: string | number) {
    return this.http.get(`${this.baseUrl}/category/${category}`);
  }

  getDataset(dataset) {
    return this.http.get(`${this.baseUrl}/dataset-content/${dataset.reference}/${dataset.table_name}`);
  }

  getDatasetsDetailByCategory(category: string | number) {
    return this.http.get<DatasetDetail[]>(`${this.baseUrl}/dataset/category/${category}`);
  }

  getDatasetContent(dataset) {
    return this.http.get<Dataset>(`${this.baseUrl}/dataset-content/${dataset.reference}/${dataset.table_name}`);
  }
}
