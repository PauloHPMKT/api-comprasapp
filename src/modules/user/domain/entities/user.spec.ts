import { User } from './User';

describe('User', () => {
  it('should be defined', () => {
    const user = new User();
    expect(user).toBeDefined();
  });
});
