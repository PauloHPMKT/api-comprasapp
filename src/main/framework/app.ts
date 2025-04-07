import express, { Application } from 'express';
import setUpMiddlewares from '../configs/middlewares';
import { FactoryRoutes } from './routes/factory-routes';
import logger from 'morgan';

export class App {
  public readonly app: Application;
  public readonly router = FactoryRoutes.createRoutes();
  constructor() {
    this.app = express();
    this.logs();
    this.setMiddlewares();
    this.initRoutes();
  }

  private logs() {
    this.app.use(logger('dev'));
  }

  setMiddlewares() {
    setUpMiddlewares(this.app);
  }

  initRoutes() {
    const routes = [this.router.signupRoutes, this.router.purchaseListRoutes];
    routes.forEach((route) => this.app.use('/api', route));
  }

  public initServer(port: string | number) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
