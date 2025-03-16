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

  it('should create a user with valid date', () => {
    const sut = makeSut();
    expect(sut.createdAt).toBeDefined();
    expect(sut.createdAt).toBeInstanceOf(Date);
  });

  it('should be able to create a user with null avatar', () => {
    const sut = makeSut();
    expect(sut.avatar).toBeNull();
  });
});
