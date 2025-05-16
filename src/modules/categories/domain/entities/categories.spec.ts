import { Category } from './Category';

const makeSut = (): Category => {
  return new Category({
    name: 'Category name',
  });
};

describe('Categories Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(Category);
    expect(sut).toBeTruthy();
  });

  it('should create a new Category by name', () => {
    const sut = makeSut();
    expect(sut.props.name).toEqual('Category name');
  });
});
