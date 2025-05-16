import { Category } from './Category';

const makeSut = (): Category => {
  return new Category();
};

describe('Categories Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(Category);
    expect(sut).toBeTruthy();
  });
});
