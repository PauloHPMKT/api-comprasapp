import { CreateCategoryController } from '@/modules/categories/presentation/controller/create-category';
import { makeCreateCategoryUseCase } from '../data/create-category';

export const makeCreateCategoryController = (): CreateCategoryController => {
  const createCategoryUseCase = makeCreateCategoryUseCase();
  return new CreateCategoryController(createCategoryUseCase);
};
