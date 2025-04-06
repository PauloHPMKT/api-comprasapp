import { AddPurchaseListRepository } from '../protocols/add-purchase-list-repository';
import { AddPurchaseListUseCase } from './add-purchase-list';

const makeAddPurchaseListRepository = (): AddPurchaseListRepository => {
  class AddPurchaseListRepositoryStub implements AddPurchaseListRepository {
    async addList(data: any): Promise<any> {
      return Promise.resolve({
        id: 'valid_id',
        title: 'valid_list_title',
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
        userId: 'valid_user_id',
        createdAt: new Date('2025-10-01'),
        updatedAt: null,
      });
    }
  }
  return new AddPurchaseListRepositoryStub();
};

const makeSut = (): SutTypes => {
  const addPurchaseListRepositoryStub = makeAddPurchaseListRepository();
  const sut = new AddPurchaseListUseCase(addPurchaseListRepositoryStub);
  return {
    sut,
    addPurchaseListRepositoryStub,
  };
};

type SutTypes = {
  sut: AddPurchaseListUseCase;
  addPurchaseListRepositoryStub: AddPurchaseListRepository;
};

describe('AddPurchaseListUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AddPurchaseListUseCase);
    expect(sut).toBeTruthy();
  });

  it('should call a repository with correct values', () => {
    const { sut } = makeSut();
    const addSpy = jest.spyOn(sut, 'add');
    const params = {
      title: 'anytitle',
      description: 'anydescription',
      products: [
        {
          name: 'Product 1',
          quantity: 2,
          unitPrice: 10,
          totalPrice: 20,
        },
      ],
      userId: 'anyuserid',
    };
    sut.add(params);
    expect(addSpy).toHaveBeenCalledWith(params);
  });
});
