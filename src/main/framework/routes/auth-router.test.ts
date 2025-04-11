import bcrypt from 'bcryptjs';
import request from 'supertest';
import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { App } from '../app';

const makeSut = () => {
  const appInstance = new App();
  const { app } = appInstance;
  return { app };
};

describe('AuthRouter', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const userCollection = MongoHelper.getCollection('users');
    await userCollection.deleteMany({});
    await userCollection.insertOne({
      email: 'valid_email@mail.com',
      password: await bcrypt.hash('valid_password', 12),
      name: 'valid_name',
      avatar: null,
      accountId: 'valid_account_id',
      createdAt: new Date('2025-01-01'),
    });
  });

  it('Should return a token on success', async () => {
    const { app } = makeSut();
    await request(app)
      .post('/api/auth')
      .send({
        email: 'valid_email@mail.com',
        password: 'valid_password',
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('access_token');
      });
  });
});
