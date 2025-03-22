import { UniqueEntityId } from '@/shared/seedworks/domain/values-objects/unique-entity-id.vo';
import { Account, AccountProps } from './Acount';

const makeSut = (id?: UniqueEntityId): Account => {
  const accountProps: AccountProps = {
    userId: 'anyuserid',
  };
  return new Account(accountProps, id);
};

describe('Account Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeTruthy();
  });

  it('shoud create a new Account with a valid userId', () => {
    const sut = makeSut();
    expect(sut.props.userId).not.toBeUndefined();
    expect(sut.props.userId).not.toBeNull();
  });

  it('should create a new Account active as default', () => {
    const sut = makeSut();
    expect(sut.props.isActive).toBeTruthy();
    expect(sut.props.isActive).not.toBeFalsy();
    expect(sut.props.isActive).toEqual(true);
  });

  it('should create a new Account with free plan', () => {
    const sut = makeSut();
    expect(sut.props.plan).toEqual('free');
    expect(sut.props.plan).not.toBeUndefined();
    expect(sut.props.plan).not.toBeNull();
  });

  it('should create a new User with a valid date', () => {
    const sut = makeSut();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('should create a new Account with a valid id', () => {
    const id = new UniqueEntityId('12cbe98261477fe78941e730');
    const sut = makeSut(id);
    expect(sut.id).not.toBeUndefined();
    expect(sut.id).not.toBeNull();
    expect(sut.id).toEqual(id.value);
    expect(sut.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
  });

  describe('Getters and Setters', () => {
    it('should get activate status', () => {
      const sut = makeSut();
      expect(sut.isActive).toBeTruthy();
    });

    it('should get a plan', () => {
      const sut = makeSut();
      expect(sut.plan).toEqual('free');
    });

    it('should get createdAt', () => {
      const sut = makeSut();
      expect(sut.createdAt).toBeInstanceOf(Date);
      expect(sut.createdAt).not.toBeUndefined();
      expect(sut.createdAt).not.toBeNull();
    });

    it('should set a new isActive status', () => {
      const sut = makeSut();
      sut['isActive'] = false;
      expect(sut['isActive']).toBeFalsy();
      expect(sut['isActive']).toEqual(false);
    });
  });
});
