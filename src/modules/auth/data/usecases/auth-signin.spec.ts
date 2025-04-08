import { AuthSigninUseCase } from './auth-signin';

const makeSut = (): SutTypes => {
  const sut = new AuthSigninUseCase();
  return {
    sut,
  };
};

type SutTypes = {
  sut: AuthSigninUseCase;
};

describe('AuthSigninUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AuthSigninUseCase);
    expect(sut).toBeTruthy();
  });
});
