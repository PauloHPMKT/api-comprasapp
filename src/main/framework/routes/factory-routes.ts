import { PurchaseListRoutes } from './create-purchase-list-router';
import { SignupRouter } from './signup-router';

export class FactoryRoutes {
  static createRoutes() {
    const signupRoutes = new SignupRouter();
    const purchaseListRoutes = new PurchaseListRoutes();

    return {
      signupRoutes: signupRoutes.getRouter(),
      purchaseListRoutes: purchaseListRoutes.getRouter(),
    };
  }
}
