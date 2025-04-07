import request from 'supertest';
import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { App } from '../app';

const makeSut = () => {
  const appInstance = new App();
  const { app } = appInstance;
  return { app };
};

describe('CreatePurchaseListRouter', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('purchase-list');
    await accountCollection.deleteMany({});
  });

  it('Should return a purchase-list on success', async () => {
    const { app } = makeSut();
    await request(app)
      .post('/api/purchase-list/add')
      .send({
        title: 'anytitle',
        description: 'anydescription',
        products: [
          {
            name: `Product ${Math.round(Math.random() * 100)}`,
            quantity: 2,
            unitPrice: 10,
            totalPrice: 20,
          },
        ],
      })
      .expect(201);
  });
});
