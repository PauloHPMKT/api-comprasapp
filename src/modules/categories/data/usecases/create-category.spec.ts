import { CreateNewCategoryUseCase } from './create-category';

const makeSut = (): SutTypes => {
  const sut = new CreateNewCategoryUseCase();
  return {
    sut,
  };
};

interface SutTypes {
  sut: CreateNewCategoryUseCase;
}

describe('CreateNewCategoryUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateNewCategoryUseCase);
    expect(sut).toBeTruthy();
  });
});
