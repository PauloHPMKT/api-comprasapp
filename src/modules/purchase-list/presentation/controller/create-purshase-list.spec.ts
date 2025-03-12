import { Controller } from '../../../shared/presentation/protocol/controller';
import { CreatePurchaseListController } from './create-purshase-list';

const makeSut = (): Controller => {
  return new CreatePurchaseListController();
};

describe('CreatePurchaseListController', () => {
  it('should be true', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return 400 if no list name is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        items: [
          {
            product_id: 'any_id',
            quantity: 3,
          },
          {
            product_id: 'any_id',
            quantity: 2,
          },
        ],
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error('Missing param: listName'));
  });

  it('should return 400 if no items is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        listName: 'any_name',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error('Missing param: items'));
  });

  it('should return 400 if no quantity is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        listName: 'any_name',
        items: [
          {
            product_id: 'any_id',
          },
        ],
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error('Missing param: quantity'));
  });

  it('should return 400 if no product_id is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        listName: 'any_name',
        items: [
          {
            quantity: 3,
          },
        ],
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error('Missing param: product_id'));
  });
});
