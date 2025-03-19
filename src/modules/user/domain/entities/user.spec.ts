import { User } from './User';

const makeSut = (): User => {
  const userProps = {
    name: 'John Doe',
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

  it('should create a new User by name', () => {
    const sut = makeSut();
    expect(sut.props.name).toBe('John Doe');
  });
});
