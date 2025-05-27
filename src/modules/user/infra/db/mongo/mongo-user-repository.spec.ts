import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { MongoUserRepository } from './mongo-user-repository';
import { ObjectId } from 'mongodb';

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
    const accountCollection = MongoHelper.getCollection('users');
    await accountCollection.deleteMany({});
  });

  it('Should be defined', () => {
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

  it('Should return false if email not exists', async () => {
    const sut = makeSut();
    jest.spyOn(sut, 'verify').mockResolvedValueOnce(false);
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
    expect(isUser).toBe(false);
  });

  it('Should return an user on success', async () => {
    const sut = makeSut();
    const account = await sut.create({
      id: new ObjectId().toHexString(),
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      avatar: null,
      accountId: new ObjectId().toHexString(),
      createdAt: expect.any(Date),
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
    expect(account.avatar).toBeNull();
    expect(account.accountId).toBeTruthy();
  });

  it('should return a valid user found by email', async () => {
    const sut = makeSut();
    jest.spyOn(sut, 'findByEmail').mockResolvedValueOnce({
      id: new ObjectId().toHexString(),
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      avatar: null,
      accountId: new ObjectId().toHexString(),
      createdAt: expect.any(Date),
    });
    const getCollection = MongoHelper.getCollection('users');
    await getCollection.insertOne({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      avatar: null,
      accountId: 'any_account_id',
      createdAt: new Date('2025-12-10'),
    });
    const user = await sut.findByEmail('any_email@mail.com');
    expect(user).toBeTruthy();
  });
});
