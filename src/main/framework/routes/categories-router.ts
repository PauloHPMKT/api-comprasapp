import { Router } from 'express';
import { expressAdapter } from '../adapters/express-adapter';
import { makeCreateCategoryController } from '@/main/factories/modules/category/presentation/create-category';
import { makeGetCategoriesControllerFactory } from '@/main/factories/modules/category/presentation/get-categories';

export class CategoriesRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter() {
    const createCategoryRoute = this.router.post(
      '/category',
      expressAdapter(makeCreateCategoryController()),
    );
    const getCategoriesRoute = this.router.get(
      '/categories',
      expressAdapter(makeGetCategoriesControllerFactory()),
    );

    return [createCategoryRoute, getCategoriesRoute];
  }
}
