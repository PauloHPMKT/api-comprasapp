import { MissingParamError } from '@/shared/presentation/errors';
import { CreatePurchaseListController } from './create-purchase-list';
import { AddPurchaseList } from '../../domain/usecases/add-purchase-list';
import { PurchaseListModel } from '../../domain/models/create-purchase-list';

const makeAddPurchaseList = (): AddPurchaseList => {
  class AddPurchaseListStub implements AddPurchaseList {
    async add(
      data: PurchaseListModel.Params,
    ): Promise<PurchaseListModel.Result> {
      return new Promise((resolve) =>
        resolve({
          id: 'any_id',
          title: 'valid_title',
          description: null,
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
          userId: 'mocked_user_id',
          createdAt: new Date('2025-01-01'),
          updatedAt: null,
        }),
      );
    }
  }
  return new AddPurchaseListStub();
};

const makeSut = (): SutTypes => {
  const addPurchaseListStub = makeAddPurchaseList();
  const sut = new CreatePurchaseListController(addPurchaseListStub);
  return {
    sut,
    addPurchaseListStub,
  };
};

type SutTypes = {
  sut: CreatePurchaseListController;
  addPurchaseListStub: AddPurchaseList;
};

describe('CreatePurchaseListController', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(CreatePurchaseListController);
    expect(sut).toBeTruthy();
  });

  it('should return 400 if no title list is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
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
    const httpResponse = await sut.handle(httpRequest as any);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('title'));
  });

  it('should return 400 if no product is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        title: 'any title',
        description: 'any description',
      },
    };
    const httpResponse = await sut.handle(httpRequest as any);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('products'));
  });

  it('should return 400 if no producst name is provided', async () => {
    const { sut } = makeSut();
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
    const httpResponse = await sut.handle(httpRequest as any);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no producst quantity is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        title: 'any title',
        description: 'any description',
        products: [
          {
            name: 'Product 1',
            unitPrice: null,
            totalPrice: null,
          },
        ],
      },
    };
    const httpResponse = await sut.handle(httpRequest as any);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('quantity'));
  });

  it('should call AddPurchaseList with correct values', async () => {
    const { sut, addPurchaseListStub } = makeSut();
    const addPurchaseListSpy = jest.spyOn(addPurchaseListStub, 'add');
    const httpRequest = {
      body: {
        title: 'any title',
        description: null,
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
        userId: 'mocked_user_id',
      },
    };
    await sut.handle(httpRequest as any);
    expect(addPurchaseListSpy).toHaveBeenCalledWith({
      title: 'any title',
      description: null,
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
      userId: 'mocked_user_id',
    });
  });

  it('should throw if AddPurchaseList throws', async () => {
    const { sut, addPurchaseListStub } = makeSut();
    jest.spyOn(addPurchaseListStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        title: 'any title',
        description: null,
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
    const httpResponse = await sut.handle(httpRequest as any);
    expect(httpResponse.statusCode).toEqual(500);
    expect(httpResponse.body).toEqual(new Error('Internal server error'));
  });

  it('should return 201 if a purchase list is created on success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        title: 'any title',
        description: null,
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
    const httpResponse = await sut.handle(httpRequest as any);
    expect(httpResponse.statusCode).toEqual(201);
    expect(httpResponse.body).toEqual({
      id: 'any_id',
      title: 'valid_title',
      description: null,
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
      userId: 'mocked_user_id',
      createdAt: new Date('2025-01-01'),
      updatedAt: null,
    });
  });
});
