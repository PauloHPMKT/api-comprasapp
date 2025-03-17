import { User } from './User';

const makeSut = (id?: string): User => {
  const userProps = {
    name: 'anyemail',
    email: 'anyemail@mail.com',
    password: 'anypassword',
  };
  return new User(userProps, id);
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

  it('should create a user with a valid Date', () => {
    const sut = makeSut();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('shoul create a user with createdAt', () => {
    const sut = makeSut();
    const createdAt = new Date();
    sut.props.createdAt = createdAt;

    expect(sut.props).toMatchObject({
      createdAt,
    });
  });

  it('should validate if id is not null', () => {
    const sut = makeSut();
    expect(sut.id).not.toBeNull();
    expect(sut.id).toBeTruthy();
  });

  it('should validate id is generated even undefined', () => {
    const sut = makeSut(undefined);
    expect(sut.id).not.toBeUndefined();
    expect(sut.id).toBeTruthy();
  });
});
