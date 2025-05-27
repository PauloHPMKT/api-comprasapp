import { CategoryModel } from '../models/category';

export interface GetCategories {
  execute(): Promise<CategoryModel.Result[]>;
}
