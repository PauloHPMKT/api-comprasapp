import { Account, AccountProps } from './Acount';

const makeSut = (): Account => {
  const accountProps: AccountProps = {
    userId: 'anyuserid',
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
});
