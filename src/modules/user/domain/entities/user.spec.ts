import { User, UserProps } from './User';

const makeSut = (): User => {
  const userProps: UserProps = {
    name: 'John Doe',
    email: 'anyemail@mail.com',
    password: 'anypassword',
  };
  return new User(userProps);
};

describe('User Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(User);
    expect(sut).toBeTruthy();
  });

  it('should create a new User with name', () => {
    const sut = makeSut();
    expect(sut.props.name).toBe('John Doe');
  });

  it('should create a new User with email', () => {
    const sut = makeSut();
    expect(sut.props.email).toEqual('anyemail@mail.com');
  });

  it('should create a new User with password', () => {
    const sut = makeSut();
    expect(sut.props.password).not.toBeUndefined();
    expect(sut.props.password).toEqual('anypassword');
  });
});
