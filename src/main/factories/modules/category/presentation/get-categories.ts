import { GetCategoriesController } from '@/modules/categories/presentation/controller/get-categories';
import { makeGetCategoriesUseCaseFactory } from '../data/get-categories';

export const makeGetCategoriesControllerFactory =
  (): GetCategoriesController => {
    const getCategoriesUseCase = makeGetCategoriesUseCaseFactory();
    return new GetCategoriesController(getCategoriesUseCase);
  };
