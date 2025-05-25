import { CategoryModel } from '../models/category';

export interface CreateCategory {
  execute(params: CategoryModel.Params): Promise<CategoryModel.Result>;
}
