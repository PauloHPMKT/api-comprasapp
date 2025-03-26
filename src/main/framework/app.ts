import express, { Application } from 'express';
import setUpMiddlewares from '../configs/middlewares';

export class App {
  public readonly app: Application;
  constructor() {
    this.app = express();
    this.setMiddlewares();
  }

  setMiddlewares() {
    setUpMiddlewares(this.app);
  }

  public initServer(port: string | number) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
