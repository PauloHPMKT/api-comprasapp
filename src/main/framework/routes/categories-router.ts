import { Router } from 'express';
import { expressAdapter } from '../adapters/express-adapter';
import { makeCreateCategoryController } from '@/main/factories/modules/category/presentation/create-category';

export class CategoriesRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter() {
    return this.router.post(
      '/category',
      expressAdapter(makeCreateCategoryController()),
    );
  }
}
