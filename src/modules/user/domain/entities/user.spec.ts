import { User } from './User';

const makeSut = (): User => {
  return new User({
    name: 'anyname',
    email: 'anyemail@mail.com',
    password: 'anypassword',
  });
};

describe('User', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it('should create a new user with an id', () => {
    const sut = makeSut();
    expect(sut.id).toBeDefined();
    expect(sut.id).not.toBeNull();
  });
});
