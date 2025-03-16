import { AddAccountUseCase } from './add-account';

const makeSut = (): AddAccountUseCase => {
  return new AddAccountUseCase();
};

describe('AddAccount', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });
});
