import { Router } from 'express';
import { expressAdapter } from '../adapters/express-adapter';
import { makeAuthControllerFactory } from '@/main/factories/modules/signup/presentation/auth-factory';

export class AuthRouter {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter() {
    return this.router.post(
      '/auth',
      expressAdapter(makeAuthControllerFactory()),
    );
  }
}
