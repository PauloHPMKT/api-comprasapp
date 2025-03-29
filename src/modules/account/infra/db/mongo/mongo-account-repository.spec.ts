import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { MongoAccountRepository } from './mongo-account-repository';
import { Account } from '@/modules/account/domain/entities/Acount';
import { ObjectId } from 'mongodb';
import { AddAccountModel } from '@/modules/account/domain/models/add-account-model';

const makeSut = (): MongoAccountRepository => {
  return new MongoAccountRepository();
};

describe('MongoAccountRepository', () => {
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
    expect(sut).toBeInstanceOf(MongoAccountRepository);
  });

  it('should add an account on success', async () => {
    const sut = makeSut();
    const accountData: AddAccountModel.Params = {
      id: new ObjectId().toHexString(),
      userId: new ObjectId().toHexString(),
      isActive: true,
      plan: 'free',
      createdAt: new Date('2025-12-10'),
    };
    await sut.add(accountData);
    const accountCollection = MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      _id: MongoHelper.toObjectId(accountData.id),
    });
    expect(account).toBeTruthy();
    expect(account._id).toBeTruthy();
    expect(account.userId).toEqual(MongoHelper.toObjectId(accountData.userId));
    expect(account.isActive).toBe(true);
    expect(account.plan).toBe('free');
    expect(account.createdAt).toEqual(new Date('2025-12-10'));
  });
});
