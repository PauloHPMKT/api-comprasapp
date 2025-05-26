import request from 'supertest';
import { App } from '../app';
import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';

const makeSut = () => {
  const appInstance = new App();
  const { app } = appInstance;
  return { app };
};

describe('Categories Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('categories');
    await accountCollection.deleteMany({});
  });

  it('Should return a category on success', async () => {
    const { app } = makeSut();
    await request(app)
      .post('/api/category')
      .send({
        name: 'Category Test',
        icon: '😀',
      })
      .expect(201);
  });
});
