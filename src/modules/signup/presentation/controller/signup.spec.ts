import { SignupController } from './signup';

const makeSut = (): SignupController => {
  return new SignupController();
};

describe('Signup Controller', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(SignupController);
    expect(sut).toBeTruthy();
  });
});
