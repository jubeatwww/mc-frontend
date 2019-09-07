import { Category } from '@@core/dataset-entry/dto/category.dto';
import { DatasetDetail } from '@@core/dataset-entry/dto/dataset-detail.dto';
import { SpreadSheet } from './spreadsheet';

export class DatasetGroup {
  public name: string;
  public codeName: string;
  public category: Category;
  public datasetsDetail: DatasetDetail[];
  public cropFilter: string | null = null;
  public cropList = new Set<string>();
  public areaFilter: string | null = null;
  public areaList = new Set<string>();
  public currentData = [];
  public spreadsheet: SpreadSheet;
  public viser = [];

  constructor(
    public readonly position,
  ) { }
}
