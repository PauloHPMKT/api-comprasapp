import jwt from 'jsonwebtoken';
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
    const collection = MongoHelper.getCollection('purchase-list');
    await collection.deleteMany({});
  });

  describe('CreatePurchaseListRouter', () => {
    it('Should return a purchase-list on success', async () => {
      const { app } = makeSut();
      jest.spyOn(jwt, 'verify').mockReturnValue({
        sub: '653ad17f9f76a71b9dc2bfe2',
      } as any);

      await request(app)
        .post('/api/purchase-list/add')
        .set('Authorization', 'Bearer fake_token')
        .send({
          title: `Product ${Math.round(Math.random() * 100)}`,
          description: 'Compra da semana',
          products: [
            {
              name: 'Banana',
              quantity: 3,
              unitPrice: 2,
              totalPrice: 6,
            },
          ],
        })
        .expect(201);
    });
  });
});
