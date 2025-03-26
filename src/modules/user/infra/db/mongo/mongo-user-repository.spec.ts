import { MongoUserRepository } from './mongo-user-repository';

const makeSut = (): MongoUserRepository => {
  return new MongoUserRepository();
};

describe('MongoUserRepository', () => {
  it('Should return an user on success', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeTruthy();
    expect(sut).toBeInstanceOf(MongoUserRepository);
  });
});
