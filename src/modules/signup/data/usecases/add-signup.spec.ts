import { AddSignupUseCase } from './add-signup';

const makeSut = (): AddSignupUseCase => {
  return new AddSignupUseCase();
};

describe('AddSignupUseCase', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AddSignupUseCase);
    expect(sut).toBeTruthy();
  });
});
