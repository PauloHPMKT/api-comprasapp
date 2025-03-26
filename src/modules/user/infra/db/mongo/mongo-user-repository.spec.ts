import { MongoHelper } from '../helper/mongo-client';
import { MongoUserRepository } from './mongo-user-repository';

const makeSut = (): MongoUserRepository => {
  return new MongoUserRepository();
};

describe('MongoUserRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  it('Should return an user on success', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeTruthy();
    expect(sut).toBeInstanceOf(MongoUserRepository);
  });

  it('Should return true if email exists', async () => {
    const sut = makeSut();
    const getCollection = MongoHelper.getCollection('users');
    await getCollection.insertOne({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
      avatar: null,
      accountId: 'valid_account_id',
      createdAt: new Date('2025-12-10'),
    });
    const isUser = await sut.verify('valid_email@mail.com');
    expect(isUser).toBe(true);
  });
});
