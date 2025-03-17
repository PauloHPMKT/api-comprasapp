import { User } from './User';

const makeSut = (): User => {
  const userProps = {
    name: 'anyemail',
    email: 'anyemail@mail.com',
    password: 'anypassword',
  };
  return new User(userProps);
};

describe('User entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeTruthy();
    expect(sut).toBeDefined();
  });

  it('should create a user with no avatar', () => {
    const sut = makeSut();
    expect(sut.props.avatar).toBeNull();
  });
});
