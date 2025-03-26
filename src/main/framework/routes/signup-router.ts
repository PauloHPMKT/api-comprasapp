import { Router } from 'express';
import { expressAdapter } from '../adapters/express-adapter';
import { makeSignupControllerFactory } from '@/main/factories/modules/signup/presentation/signup-factory';

export class SignupRouter {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter() {
    return this.router.post(
      '/signup',
      expressAdapter(makeSignupControllerFactory()),
    );
  }
}
