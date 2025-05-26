import { CategoryRepoModel } from '../models/category';

export interface CreateCategoryRepository {
  create(params: CategoryRepoModel.Params): Promise<CategoryRepoModel.Result>;
}
