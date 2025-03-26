import { Application } from 'express';
import { cors } from '../middlewares/cors';
import { bodyParser } from '../middlewares/body-parser';

export default (app: Application): void => {
  const middlewares = [cors, bodyParser];
  middlewares.forEach((middleware) => app.use(middleware));
};
