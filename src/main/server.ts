import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { App } from './framework/app';

MongoHelper.connect('mongodb://localhost:27017/comprasapp')
  .then(() => {
    const port = 3005;
    const app = new App();
    app.initServer(port);
    console.log('Connected to MongoDB');
  })
  .catch(console.error);
