import env from './configs/env';
import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { App } from './framework/app';

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const port = env.port;
    const app = new App();
    app.initServer(port);
    console.log('Connected to MongoDB!!!');
  })
  .catch(console.error);
