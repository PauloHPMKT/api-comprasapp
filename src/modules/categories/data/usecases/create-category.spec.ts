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

  it('should create a new category with valid data', async () => {
    const { sut } = makeSut();
    const addSpy = jest.spyOn(sut, 'execute');
    const params = {
      name: 'newcategory',
      icon: '🛒',
    };
    const result = await sut.execute(params);
    expect(addSpy).toHaveBeenCalledWith(params);
    expect(result).toEqual({
      id: expect.any(String),
      name: 'newcategory',
      icon: '🛒',
      createdAt: expect.any(Date),
    });
  });
});
