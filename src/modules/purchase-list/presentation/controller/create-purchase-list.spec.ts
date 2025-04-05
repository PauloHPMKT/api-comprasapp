import { MissingParamError } from '@/shared/presentation/errors';
import { CreatePurchaseListController } from './create-purchase-list';

export const mockDecodeToken = (authorization?: string): string | null => {
  if (!authorization.startsWith('Bearer ')) return null;
  const fakeToken = authorization.split(' ')[1];

  if (fakeToken !== 'valid_token') return null;

  // deve retornar o objeto do token decodificado
  return 'mocked_user_id';
};

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
      headers: {
        authorization: 'Bearer valid_token',
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
      headers: {
        authorization: 'Bearer valid_token',
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
      headers: {
        authorization: 'Bearer valid_token',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no producst quantity is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        title: 'any title',
        description: 'any description',
        products: [
          {
            name: 'Product 1',
            quantity: undefined,
            unitPrice: null,
            totalPrice: null,
          },
        ],
      },
      headers: {
        authorization: 'Bearer valid_token',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('quantity'));
  });

  it('should return 400 if no userId is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        title: 'any title',
        description: 'any description',
        products: [
          {
            name: 'Product 1',
            quantity: 2,
            unitPrice: null,
            totalPrice: null,
          },
        ],
      },
      headers: {
        authorization: 'Bearer invalid_token',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('userId'));
  });
});
