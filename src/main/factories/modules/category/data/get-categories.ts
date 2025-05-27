import { GetCategoriesUseCase } from '@/modules/categories/data/usecases/get-categories';
import { MongoCategoryRepository } from '@/modules/categories/infra/db/mongo/mongo-category-repository';

export const makeGetCategoriesUseCaseFactory = (): GetCategoriesUseCase => {
  const mongoCategoryRepository = new MongoCategoryRepository();
  const getCategoriesRepository = mongoCategoryRepository;
  return new GetCategoriesUseCase(getCategoriesRepository);
};
