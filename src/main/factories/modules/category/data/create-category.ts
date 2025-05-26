import { CreateNewCategoryUseCase } from '@/modules/categories/data/usecases/create-category';
import { MongoCategoryRepository } from '@/modules/categories/infra/db/mongo/mongo-category-repository';

export const makeCreateCategoryUseCase = (): CreateNewCategoryUseCase => {
  const mongoCategoryRepository = new MongoCategoryRepository();
  const verifyCategoryRepository = mongoCategoryRepository;
  const addCategoryRepository = mongoCategoryRepository;
  return new CreateNewCategoryUseCase(
    verifyCategoryRepository,
    addCategoryRepository,
  );
};
