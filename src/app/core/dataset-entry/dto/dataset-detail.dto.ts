import { Category } from './category.dto';
import { Crop } from './crop.dto';

export interface DatasetDetail {
  id: number;
  name: string;
  code_name: string;

  category_id?: number;
  category: Category;

  crop_id?: number;
  crop: Crop;

  reference: string;
  source_table: string;
  table_name: string;
}
