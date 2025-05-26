import { CategoryModel } from '../../domain/models/category';
import { CreateCategory } from '../../domain/usecases/create-category';
import { VerifyCategoryRepository } from '../protocols/verify-category-repository';

export class CreateNewCategoryUseCase implements CreateCategory {
  constructor(
    private readonly verifyCateroryRepository: VerifyCategoryRepository,
  ) {}

  async execute(params: CategoryModel.Params): Promise<CategoryModel.Result> {
    const { name, icon } = params;
    const categoryExists = await this.verifyCateroryRepository.verify(name);
    if (categoryExists) {
      throw new Error('Category already exists');
    }

    return new Promise((resolve) =>
      resolve({
        id: 'valid_id',
        name: 'newcategory',
        icon: '🛒',
        createdAt: new Date(),
      }),
    );
  }
}
