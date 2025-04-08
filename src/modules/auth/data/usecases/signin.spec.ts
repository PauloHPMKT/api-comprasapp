import { SignInUseCase } from './signin';

const makeSut = (): SutTypes => {
  const sut = new SignInUseCase();
  return {
    sut,
  };
};

type SutTypes = {
  sut: SignInUseCase;
};

describe('SginInUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(SignInUseCase);
    expect(sut).toBeTruthy();
  });
});
