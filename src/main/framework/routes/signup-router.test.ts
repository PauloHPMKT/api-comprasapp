import request from 'supertest';
import { App } from '../app';
import { beforeEach } from 'node:test';
import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';

const makeSut = () => {
  const appInstance = new App();
  const { app } = appInstance;
  return { app };
};

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('users');
    await accountCollection.deleteMany({});
  });

  it('Should return an user on success', async () => {
    const { app } = makeSut();
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Paulo',
        email: 'paulo_email@mail.com',
        password: '123456',
        passwordConfirmation: '123456',
      })
      .expect(201);
  });
});
