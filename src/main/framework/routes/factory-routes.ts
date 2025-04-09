import { AuthRouter } from './auth-router';
import { PurchaseListRoutes } from './create-purchase-list-router';
import { SignupRouter } from './signup-router';

export class FactoryRoutes {
  static createRoutes() {
    const signupRoutes = new SignupRouter();
    const purchaseListRoutes = new PurchaseListRoutes();
    const authRouter = new AuthRouter();

    return {
      signupRoutes: signupRoutes.getRouter(),
      purchaseListRoutes: purchaseListRoutes.getRouter(),
      authRoutes: authRouter.getRouter(),
    };
  }
}
