import { Account } from './Acount';

const makeSut = (): Account => {
  return Account;
};

describe('Account Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeTruthy();
  });
});
