import { CategoryModel } from '../../domain/models/category';
import { CreateCategory } from '../../domain/usecases/create-category';

export class CreateNewCategoryUseCase implements CreateCategory {
  async execute(params: CategoryModel.Params): Promise<CategoryModel.Result> {
    return new Promise((resolve) => resolve(null));
  }
}
