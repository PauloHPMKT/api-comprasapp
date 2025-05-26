import { id } from 'jest.config';
import { CategoryRepoModel } from '../models/category';
import { CreateCategoryRepository } from '../protocols/create-category-repository';
import { VerifyCategoryRepository } from '../protocols/verify-category-repository';
import { CreateNewCategoryUseCase } from './create-category';

const makeCreateCategoryRepositoryStub = (): CreateCategoryRepository => {
  class CreateNewCategoryRepositoryStub implements CreateCategoryRepository {
    create(
      params: CategoryRepoModel.Params,
    ): Promise<CategoryRepoModel.Result> {
      return new Promise((resolve) =>
        resolve({
          id: 'valid_id',
          name: params.name,
          icon: params.icon,
          createdAt: new Date(),
        }),
      );
    }
  }
  return new CreateNewCategoryRepositoryStub();
};

const makeVerifyCategoryRepositoryStub = (): VerifyCategoryRepository => {
  class VerifyCategoryRepositoryStub {
    async verify(name: string): Promise<boolean> {
      return false;
    }
  }
  return new VerifyCategoryRepositoryStub();
};

const makeSut = (): SutTypes => {
  const createCategoryRepository = makeCreateCategoryRepositoryStub();
  const verifyCategoryRepositoryStub = makeVerifyCategoryRepositoryStub();
  const sut = new CreateNewCategoryUseCase(
    verifyCategoryRepositoryStub,
    createCategoryRepository,
  );
  return {
    sut,
    verifyCategoryRepositoryStub,
    createCategoryRepository,
  };
};

interface SutTypes {
  sut: CreateNewCategoryUseCase;
  verifyCategoryRepositoryStub: VerifyCategoryRepository;
  createCategoryRepository: CreateCategoryRepository;
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

  it('should return an error if category name exists', async () => {
    const { sut, verifyCategoryRepositoryStub } = makeSut();
    jest
      .spyOn(verifyCategoryRepositoryStub, 'verify')
      .mockResolvedValueOnce(true);
    const params = {
      name: 'existingcategory',
      icon: '🛒',
    };
    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(new Error('Category already exists'));
  });

  it('should call VerifyCategoryRepository with correct values', async () => {
    const { sut, verifyCategoryRepositoryStub } = makeSut();
    const verifySpy = jest.spyOn(verifyCategoryRepositoryStub, 'verify');
    const params = {
      name: 'newcategory',
      icon: '🛒',
    };
    await sut.execute(params);
    expect(verifySpy).toHaveBeenCalledWith('newcategory');
  });

  it('should call createCategoryRepository with correct values', async () => {
    const { sut, createCategoryRepository } = makeSut();
    const verifySpy = jest.spyOn(createCategoryRepository, 'create');
    const params = {
      name: 'newcategory',
      icon: '🛒',
    };
    await sut.execute(params);
    expect(verifySpy).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'newcategory',
      icon: '🛒',
      createdAt: expect.any(Date),
    });
  });

  it('should throw an error if CreateCategoryRepository throws', async () => {
    const { sut, createCategoryRepository } = makeSut();
    jest
      .spyOn(createCategoryRepository, 'create')
      .mockRejectedValueOnce(new Error('Database error'));
    const params = {
      name: 'newcategory',
      icon: '🛒',
    };
    const promise = sut.execute(params);
    await expect(promise).rejects.toThrow(new Error('Database error'));
  });
});
