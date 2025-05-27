import { GetCategoriesController } from './get-categories';

const makeSut = () => {
  return new GetCategoriesController();
};

describe('GetCategoriesController', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(GetCategoriesController);
    expect(sut).toBeTruthy();
  });

  it('should return 200 on success', async () => {
    const sut = makeSut();
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
});
