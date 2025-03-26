import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { MongoAccountRepository } from './mongo-account-repository';
import { Account } from '@/modules/account/domain/entities/Acount';

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
    await sut.add({
      id: 'valid_id',
      userId: 'valid_user_id',
      isActive: true,
      plan: 'free' as Account.Plan,
      createdAt: new Date('2025-12-10'),
    });
    const accountCollection = MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ id: 'valid_id' });
    expect(account).toBeTruthy();
    expect(account.id).toBe('valid_id');
    expect(account.userId).toBe('valid_user_id');
    expect(account.isActive).toBe(true);
    expect(account.plan).toBe('free');
    expect(account.createdAt).toEqual(new Date('2025-12-10'));
  });
});
