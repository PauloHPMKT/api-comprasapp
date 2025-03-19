import { UniqueEntityId } from '../seedworks/domain/values-objects/unique-entity-id.vo';
import { User, UserProps } from './User';

const makeSut = (id?: UniqueEntityId): User => {
  const userProps: UserProps = {
    name: 'John Doe',
    email: 'anyemail@mail.com',
    password: 'anypassword',
  };
  return new User(userProps, id);
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

  it('should create a new User with avatar null', () => {
    const sut = makeSut();
    expect(sut.props.avatar).toBeNull();
  });

  it('should create a new User with a valid date', () => {
    const sut = makeSut();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('should create a new User with a valid id', () => {
    const id = new UniqueEntityId('5c84559c9ea984bd9b1f2bc6');
    const sut = makeSut(id);
    expect(sut.id).not.toBeUndefined();
    expect(sut.id).not.toBeNull();
    expect(sut.id).toEqual(id);
    expect(sut.id).toBeInstanceOf(UniqueEntityId);
  });

  it('should create a new User with an accountId', () => {
    const sut = makeSut();
    const accountId = 'anyaccountid';
    const generatedAccountId = sut.assignAccountId(accountId);
    expect(sut.props.accountId).toEqual(generatedAccountId);
  });

  describe('User Entity Getters', () => {
    it('should get the User name', () => {
      const sut = makeSut();
      expect(sut.name).toBe('John Doe');
    });

    it('should get the User email', () => {
      const sut = makeSut();
      expect(sut.email).toEqual('anyemail@mail.com');
    });

    it('should get the User password', () => {
      const sut = makeSut();
      expect(sut.password).toEqual('anypassword');
    });

    it('should get the User avatar when its null', () => {
      const sut = makeSut();
      expect(sut.avatar).toBeNull();
    });

    it('should get the User avatar when its not null', () => {
      const sut = makeSut();
      const avatar = 'anyavatar';
      sut.props.avatar = avatar;
      expect(sut.avatar).toEqual(avatar);
    });
  });
});
