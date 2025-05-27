import { GetCategoriesUseCase } from '@/modules/categories/data/usecases/get-categories';

export const makeGetCategoriesUseCaseFactory = (): GetCategoriesUseCase => {
  return new GetCategoriesUseCase();
};
