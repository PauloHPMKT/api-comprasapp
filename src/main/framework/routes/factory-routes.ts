import { SignupRouter } from './signup-router';

export class FactoryRoutes {
  static createRoutes() {
    const signupRoutes = new SignupRouter();

    return {
      signupRoutes: signupRoutes.getRouter(),
    };
  }
}
