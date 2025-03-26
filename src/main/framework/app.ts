import express, { Application } from 'express';

export class App {
  private readonly app: Application;
  constructor() {
    this.app = express();
  }

  public initServer(port: string | number) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
