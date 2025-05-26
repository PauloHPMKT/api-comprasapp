import { CreateCategoryController } from './create-category';

const makeSut = (): SutTypes => {
  const sut = new CreateCategoryController();
  return { sut };
};

interface SutTypes {
  sut: CreateCategoryController;
}

describe('CreateCategoryController', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateCategoryController);
    expect(sut).toBeTruthy();
  });
});
