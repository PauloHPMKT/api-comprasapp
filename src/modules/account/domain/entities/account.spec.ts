import { Account, AccountProps } from './Acount';

const makeSut = (): Account => {
  const accountProps: AccountProps = {
    userId: 'anyuserid',
    isActive: true,
    plan: 'free',
  };
  return new Account(accountProps);
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
});
