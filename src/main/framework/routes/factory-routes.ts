import { AuthRouter } from './auth-router';
import { CategoriesRoutes } from './categories-router';
import { PurchaseListRoutes } from './create-purchase-list-router';
import { SignupRouter } from './signup-router';

export class FactoryRoutes {
  static createRoutes() {
    const signupRoutes = new SignupRouter();
    const purchaseListRoutes = new PurchaseListRoutes();
    const authRouter = new AuthRouter();
    const categoriesRoutes = new CategoriesRoutes();

    return {
      signupRoutes: signupRoutes.getRouter(),
      purchaseListRoutes: purchaseListRoutes.getRouter(),
      authRoutes: authRouter.getRouter(),
      categoriesRoutes: categoriesRoutes.getRouter(),
    };
  }
}
