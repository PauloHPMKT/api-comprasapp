import { MissingParamError } from '@/shared/presentation/errors';
import { CreatePurchaseListController } from './create-purchase-list';
import { HttpRequest } from '@/shared/presentation/types/http';

const makeSut = (): CreatePurchaseListController => {
  return new CreatePurchaseListController();
};

describe('CreatePurchaseListController', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreatePurchaseListController);
    expect(sut).toBeTruthy();
  });

  it('should return 400 if no title list is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        title: undefined,
        description: 'any description',
        products: [
          {
            name: 'Product 1',
            quantity: 2,
            unitPrice: null,
            totalPrice: null,
          },
          {
            name: 'Product 2',
            quantity: 1,
            unitPrice: 20,
            totalPrice: 20,
          },
        ],
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('title'));
  });

  it('should return 400 if no product is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        title: 'any title',
        description: 'any description',
        products: undefined,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('products'));
  });

  it('should return 400 if no producst name is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        title: 'any title',
        description: 'any description',
        products: [
          {
            name: undefined,
            quantity: 2,
            unitPrice: null,
            totalPrice: null,
          },
        ],
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });
});
