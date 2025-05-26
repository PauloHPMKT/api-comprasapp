import { Category } from '../../domain/entities/Category';
import { CategoryModel } from '../../domain/models/category';
import { CreateCategory } from '../../domain/usecases/create-category';
import { CreateCategoryRepository } from '../protocols/create-category-repository';
import { VerifyCategoryRepository } from '../protocols/verify-category-repository';

export class CreateNewCategoryUseCase implements CreateCategory {
  constructor(
    private readonly verifyCateroryRepository: VerifyCategoryRepository,
    private readonly createCategoryRepository: CreateCategoryRepository,
  ) {}

  async execute(params: CategoryModel.Params): Promise<CategoryModel.Result> {
    const { name, icon } = params;
    const categoryExists = await this.verifyCateroryRepository.verify(name);
    if (categoryExists) {
      throw new Error('Category already exists');
    }

    const category = new Category({
      name,
      icon,
    });

    return await this.createCategoryRepository.create(category.toJSON());
  }
}
