import { Account } from './Account';

describe('Account Entity', () => {
  it('should be defined', () => {
    const sut = new Account();
    expect(sut).toBeDefined();
  });
});
