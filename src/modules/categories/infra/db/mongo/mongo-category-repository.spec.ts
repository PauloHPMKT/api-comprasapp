import { ObjectId } from 'mongodb';
import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { MongoCategoryRepository } from './mongo-category-repository';

const makeSut = (): MongoCategoryRepository => {
  return new MongoCategoryRepository();
};

describe('MongoCategoryRepository', () => {
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

  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeTruthy();
    expect(sut).toBeInstanceOf(MongoCategoryRepository);
  });
});
