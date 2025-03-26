import { Router } from 'express';

export class SignupRouter {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter() {
    return this.router.post('/signup', (req, res) => {
      res.status(201).send();
    });
  }
}
