import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { from, Observable } from 'rxjs';
import { tap, mergeMap, map } from 'rxjs/operators';

import { DatasetEntryService } from '@@core/dataset-entry/dataset-entry.service';
import { mockSpreadSheet } from './mocks/spreadsheet.mock';
import { DatasetDetail } from '@@core/dataset-entry/dto/dataset-detail.dto';
import { Dataset } from '@@core/dataset-entry/dto/dataset.dto';
import { DatasetGroup } from './models/dataset-group';

@Component({
  selector: 'app-dataset-vis',
  templateUrl: './dataset-vis.component.html',
  styleUrls: ['./dataset-vis.component.less']
})
export class DatasetVisComponent implements OnInit {
  @Input() title = 'Title';

  public scale;
  public forceFit = true;
  public height = 400;
  public style = { stroke: '#fff', lineWidth: 1 };

  public category: string;
  public valueChain: string;
  public crop: string;

  public data: DatasetGroup[] = [];

  public selectedCrop: string[] = [];
  public selectedArea: string[] = [];

  constructor(private route: ActivatedRoute, private datasetEntryService: DatasetEntryService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.crop = params.db;
      this.category = params.category;
      this.valueChain = params.valueChain;

      this.data = [];
      this.selectedCrop = [];
      this.selectedArea = [];

      this._dataUpdate();
    });
  }

  private _dataUpdate() {
    this.datasetEntryService.getDatasetsDetailByCategory(this.category)
      .pipe(
        tap(this._setTitleAfterFetchingDatasetsDetail),
        map(this._groupDatasetsDetailByCropName),
        mergeMap(this._parseDatasetsDetailToContent$),
      ).subscribe((dataset: DatasetGroup) => {
        this._parseData(dataset);
      });
  }

  private _parseData(dataset: DatasetGroup): void {
    const filteredDataset = dataset.currentData.filter(d => d.area.name === dataset.areaFilter);

    const viserData = [];
    filteredDataset.forEach((d) => {
      const time = new Date(d.time).getFullYear().toString();
      viserData.push({ time, value: d.value });
    });

    const reversedFilteredDataset = filteredDataset.reverse();
    const spreadsheet = {
      rows: ['Area', 'Value', 'Unit'],
      columns: [],
      data: [[], [], []],
    };
    reversedFilteredDataset.forEach((d) => {
      const time = new Date(d.time).getFullYear().toString();
      spreadsheet.columns.push(time);
      spreadsheet.data[0].push(d.area.name);
      spreadsheet.data[1].push(d.value);
      spreadsheet.data[2].push(d.unit.name);
    });

    dataset.spreadsheet = spreadsheet;
    dataset.viser = viserData;
    this.data[dataset.position] = dataset;
  }

  private _setTitleAfterFetchingDatasetsDetail = (datasetsDetail: DatasetDetail[]): void => {
    if (datasetsDetail.length > 0) {
      this.title = datasetsDetail[0].category.name;
    } else {
      this.title = this.category;
    }
  }

  private _groupDatasetsDetailByCropName = (datasetsDetail: DatasetDetail[]): DatasetGroup[] => {
    const datasetGroup: DatasetGroup[] = [];
    const cropGroup = new Map();
    let pos = 0;
    datasetsDetail.forEach((set: any) => {
      const { name, code_name, category, ...info } = set;
      if (cropGroup.has(code_name)) {
        datasetGroup[cropGroup.get(code_name)].datasetsDetail.push(info);
        datasetGroup[cropGroup.get(code_name)].cropList.add(info.crop.name);
      } else {
        const dataset = new DatasetGroup(pos);
        cropGroup.set(code_name, pos);

        dataset.name = name;
        dataset.codeName = code_name;
        dataset.category = category;
        dataset.datasetsDetail = [info];
        dataset.cropFilter = info.crop.name;
        dataset.cropList.add(info.crop.name);
        datasetGroup.push(dataset);

        this.selectedCrop.push(info.crop.name);
        pos++;
      }
    });
    return datasetGroup;
  }

  private _parseDatasetsDetailToContent$ = (datasets: DatasetGroup[]): Observable<DatasetGroup> =>
    from(datasets)
    .pipe(mergeMap(this._getDatasetContent$))

  private _getDatasetContent$ = (dataset: DatasetGroup): Observable<DatasetGroup> => {
    const filteredDatasetDetail = dataset.datasetsDetail.find(d => d.crop.name === dataset.cropFilter);
    return this.datasetEntryService.getDataset(filteredDatasetDetail)
      .pipe(
        tap(this._updateAreaFilterByDataset(dataset)),
        map((datasetContent: Dataset[]): DatasetGroup => {
          dataset.currentData = datasetContent;
          return dataset;
        })
      );
  }

  private _updateAreaFilterByDataset = (dataset: DatasetGroup) => (datasetContent: Dataset[]): void => {
    if (datasetContent.length > 0) {
      datasetContent.forEach(row => {
        dataset.areaList.add(row.area.name);
      });
      if (!dataset.areaFilter || !dataset.areaList.has(dataset.areaFilter)) {
        dataset.areaFilter = datasetContent[0].area.name;
        this.selectedArea[dataset.position] = dataset.areaFilter;
      }
    }
  }

  selectCrop(crop, position) {
    const targetData: DatasetGroup = this.data[position];
    targetData.cropFilter = crop;
    this._getDatasetContent$(targetData).subscribe((dataset: DatasetGroup) => this._parseData(dataset));
  }

  selectArea(area, position) {
    const targetData: DatasetGroup = this.data[position];
    targetData.areaFilter = area;
    this._parseData(targetData);
  }
}
