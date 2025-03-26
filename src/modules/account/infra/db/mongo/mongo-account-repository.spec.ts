import { MongoAccountRepository } from './mongo-account-repository';

const makeSut = (): MongoAccountRepository => {
  return new MongoAccountRepository();
};

describe('MongoAccountRepository', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeTruthy();
    expect(sut).toBeInstanceOf(MongoAccountRepository);
  });
});
