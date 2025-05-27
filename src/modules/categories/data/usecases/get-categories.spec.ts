import { GetCategoriesRepository } from '../protocols/get-categories-repository';
import { GetCategoriesUseCase } from './get-categories';

const makeGetCategoriesRepository = (): GetCategoriesRepository => {
  class GetCategoriesRepositoryStub implements GetCategoriesRepository {
    async findAll(): Promise<any[]> {
      const createdAt = new Date('2023-01-01T00:00:00Z');
      return new Promise((resolve) =>
        resolve([
          { id: '1', name: 'Category 1', icon: '🚿', createdAt },
          { id: '2', name: 'Category 2', icon: '🥦', createdAt },
        ]),
      );
    }
  }
  return new GetCategoriesRepositoryStub();
};

const makeSut = (): SutTypes => {
  const getCategoriesRepositoryStub = makeGetCategoriesRepository();
  const sut = new GetCategoriesUseCase(getCategoriesRepositoryStub);
  return {
    sut,
    getCategoriesRepositoryStub,
  };
};

interface SutTypes {
  sut: GetCategoriesUseCase;
  getCategoriesRepositoryStub: GetCategoriesRepository;
}

describe('GetCategoriesUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(GetCategoriesUseCase);
    expect(sut).toBeTruthy();
  });

  it('should call getCategoriesRepository findAll with success', async () => {
    const { sut, getCategoriesRepositoryStub } = makeSut();
    jest.spyOn(getCategoriesRepositoryStub, 'findAll');
    await sut.execute();
    expect(getCategoriesRepositoryStub.findAll).toHaveBeenCalledTimes(1);
  });
});
