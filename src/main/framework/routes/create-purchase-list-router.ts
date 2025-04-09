import { Router } from 'express';
import { expressAdapter } from '../adapters/express-adapter';
import { makeCreatePurchaseListController } from '@/main/factories/modules/purchase-list/presentation/create-purchase-list';

export class PurchaseListRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter() {
    return this.router.post(
      '/purchase-list/add',
      expressAdapter(makeCreatePurchaseListController()),
    );
  }
}
