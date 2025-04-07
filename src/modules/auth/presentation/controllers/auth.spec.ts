import { AuthController } from './auth';

const makeSut = (): SutTypes => {
  const sut = new AuthController();
  return {
    sut,
  };
};

type SutTypes = {
  sut: AuthController;
};

describe('AuthController', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AuthController);
    expect(sut).toBeTruthy();
  });
});
