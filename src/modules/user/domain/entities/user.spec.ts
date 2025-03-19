import { User, UserProps } from './User';

const makeSut = (): User => {
  const userProps: UserProps = {
    name: 'John Doe',
    email: 'anyemail@mail.com',
  };

  console.log(new User(userProps));
  return new User(userProps);
};

describe('User Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(User);
    expect(sut).toBeTruthy();
  });

  it('should create a new User by name', () => {
    const sut = makeSut();
    expect(sut.props.name).toBe('John Doe');
  });

  it('should create a new User by email', () => {
    const sut = makeSut();
    expect(sut.props.email).toEqual('anyemail@mail.com');
  });
});
