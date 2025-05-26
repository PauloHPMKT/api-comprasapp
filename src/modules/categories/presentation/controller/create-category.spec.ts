import { MissingParamError } from '@/shared/presentation/errors';
import { CreateCategoryController } from './create-category';
import { CreateCategory } from '../../domain/usecases/create-category';
import { CategoryModel } from '../../domain/models/category';

const makeCreateCategoryStub = () => {
  class CreateCategoryStub implements CreateCategory {
    async execute(params: CategoryModel.Params): Promise<CategoryModel.Result> {
      return {
        id: 'any_id',
        name: 'anycategory',
        icon: '😀',
        createdAt: new Date(),
      };
    }
  }
  return new CreateCategoryStub();
};

const makeSut = (): SutTypes => {
  const createCategoryStub = makeCreateCategoryStub();
  const sut = new CreateCategoryController(createCategoryStub);
  return {
    sut,
    createCategoryStub,
  };
};

interface SutTypes {
  sut: CreateCategoryController;
  createCategoryStub: CreateCategory;
}

describe('CreateCategoryController', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreateCategoryController);
    expect(sut).toBeTruthy();
  });

  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        icon: '😀',
      },
    };
    const httpResponse = await sut.handle(httpRequest as any);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no icon is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
      },
    };
    const httpResponse = await sut.handle(httpRequest as any);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('icon'));
  });

  it('should call CreateCategory with correct values', async () => {
    const { sut, createCategoryStub } = makeSut();
    const createCategorySpy = jest.spyOn(createCategoryStub, 'execute');
    const httpRequest = {
      body: {
        name: 'any_name',
        icon: '😀',
      },
    };
    await sut.handle(httpRequest as any);
    expect(createCategorySpy).toHaveBeenCalledWith({
      name: 'any_name',
      icon: '😀',
    });
  });

  it('should return 500 if CreateCategory throws', async () => {
    const { sut, createCategoryStub } = makeSut();
    jest.spyOn(createCategoryStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'any_name',
        icon: '😀',
      },
    };
    const httpResponse = await sut.handle(httpRequest as any);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new Error('Internal server error'));
  });
});
