import { CategoryModel } from '../../domain/models/category';
import { GetCategories } from '../../domain/usecases/get-categories';
import { GetCategoriesController } from './get-categories';

const makeGetCategoriesUseCase = (): GetCategories => {
  class GetCategoriesController implements GetCategories {
    async execute(): Promise<CategoryModel.Result[]> {
      return new Promise((resolve) =>
        resolve([
          {
            id: '1',
            name: 'Category 1',
            icon: '🚿',
            createdAt: new Date('2023-01-01T00:00:00Z'),
          },
          {
            id: '2',
            name: 'Category 2',
            icon: '🥦',
            createdAt: new Date('2023-02-01T00:00:00Z'),
          },
          {
            id: '3',
            name: 'Category 3',
            icon: '🍎',
            createdAt: new Date('2023-03-01T00:00:00Z'),
          },
        ]),
      );
    }
  }
  return new GetCategoriesController();
};

const makeSut = (): SutTypes => {
  const getCategoriesUseCase = makeGetCategoriesUseCase();
  const sut = new GetCategoriesController(getCategoriesUseCase);
  return {
    sut,
    getCategoriesUseCase,
  };
};

interface SutTypes {
  sut: GetCategoriesController;
  getCategoriesUseCase: GetCategories;
}

describe('GetCategoriesController', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(GetCategoriesController);
    expect(sut).toBeTruthy();
  });

  it('should return 200 on success', async () => {
    const { sut } = makeSut();
    const categories = [
      {
        id: '1',
        name: 'Category 1',
        icon: '🚿',
        createdAt: new Date('2023-01-01T00:00:00Z'),
      },
      {
        id: '2',
        name: 'Category 2',
        icon: '🥦',
        createdAt: new Date('2023-02-01T00:00:00Z'),
      },
      {
        id: '3',
        name: 'Category 3',
        icon: '🍎',
        createdAt: new Date('2023-03-01T00:00:00Z'),
      },
    ];
    const httpResponse = await sut.handle();
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(categories);
  });

  it('should call GetCategoriesUseCase.execute', async () => {
    const { sut, getCategoriesUseCase } = makeSut();
    const executeSpy = jest.spyOn(getCategoriesUseCase, 'execute');
    await sut.handle();
    expect(executeSpy).toHaveBeenCalled();
  });
});
