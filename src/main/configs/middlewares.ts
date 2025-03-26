import { Application } from 'express';
import { cors } from '../middlewares/cors';
import { bodyParser } from '../middlewares/body-parser';
import { contentType } from '../middlewares/content-type';

export default (app: Application): void => {
  const middlewares = [cors, bodyParser, contentType];
  middlewares.forEach((middleware) => app.use(middleware));
};
