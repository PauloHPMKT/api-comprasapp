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
});
