import { GetCategoriesUseCase } from './get-categories';

const makeSut = (): SutTypes => {
  const sut = new GetCategoriesUseCase();
  return {
    sut,
  };
};

interface SutTypes {
  sut: GetCategoriesUseCase;
}

describe('GetCategoriesUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(GetCategoriesUseCase);
    expect(sut).toBeTruthy();
  });
});
