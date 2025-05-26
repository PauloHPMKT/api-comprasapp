import { MissingParamError } from '@/shared/presentation/errors';
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
});
