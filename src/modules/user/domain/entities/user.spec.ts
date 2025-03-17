import { User } from './User';

const makeSut = (): User => {
  return new User();
};

describe('User entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeTruthy();
    expect(sut).toBeDefined();
  });
});
