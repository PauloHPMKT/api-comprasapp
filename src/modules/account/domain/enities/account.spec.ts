import { Account } from './Account';

const makeSut = (): Account => {
  return new Account({
    userId: 'valid_id',
  });
};

describe('Account Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return a valid account id', () => {
    const sut = makeSut();
    expect(sut.id).toBeTruthy();
    expect(sut.id).not.toBeNull();
  });
});
