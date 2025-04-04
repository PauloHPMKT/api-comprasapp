import { UniqueEntityId } from '@/shared/seedworks/domain/values-objects/unique-entity-id.vo';
import { ProductProps, Products, PurchaseList } from './PurchaseList';

const makeSut = (
  customProducts?: Products.toCreate[],
  id?: UniqueEntityId,
): PurchaseList => {
  const purchaseList: ProductProps = {
    title: 'List title',
    products: customProducts || [
      {
        name: 'Product 1',
        quantity: 2,
        price: 10,
      },
      {
        name: 'Product 2',
        quantity: 1,
        price: 20,
      },
    ],
    userId: 'anyuserid',
  };
  return new PurchaseList(purchaseList, id);
};

describe('PurchaseList', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(PurchaseList);
    expect(sut).toBeTruthy();
  });

  it('should create a list by name', () => {
    const sut = makeSut();
    const listName = 'List title';
    expect(sut.props.title).toEqual(listName);
  });

  it('should create a purchase list with description null', () => {
    const sut = makeSut();
    expect(sut.props.description).toBeNull();
    expect(sut.props.description).not.toBeUndefined();
  });

  it('should create a purchase list with a list of products', () => {
    const sut = makeSut();
    const products = [
      {
        name: 'Product 1',
        quantity: 2,
        price: 10,
      },
      {
        name: 'Product 2',
        quantity: 1,
        price: 20,
      },
    ];
    expect(sut.props.products).not.toBeUndefined();
    expect(sut.props.products).not.toBeNull();
    expect(sut.props.products).toEqual(products);
  });

  it('ensure a purchase list is created with a users id reference', () => {
    const sut = makeSut();
    const userId = 'anyuserid';
    expect(sut.props.userId).not.toBeUndefined();
    expect(sut.props.userId).not.toBeNull();
    expect(typeof sut.props.userId).toEqual('string');
    expect(sut.props.userId).toEqual(userId);
  });

  it('should be able to create a purchase list with product price null', () => {
    const customProducts = [
      {
        name: 'Product 1',
        quantity: 2,
      },
      {
        name: 'Product 2',
        quantity: 1,
        price: 20,
      },
    ];

    const sut = makeSut(customProducts);
    const expectedProducts = [
      {
        name: 'Product 1',
        quantity: 2,
        price: null,
      },
      {
        name: 'Product 2',
        quantity: 1,
        price: 20,
      },
    ];

    expect(sut.props.products).toEqual(expectedProducts);
    expect(sut.props.products[0].price).toBeNull();
  });

  it('should create a purchase list with a valid Date', () => {
    const sut = makeSut();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
    expect(sut.props.createdAt).not.toBeUndefined();
    expect(sut.props.createdAt).not.toBeNull();
  });

  it('should create a purchase list with updatedAt null', () => {
    const sut = makeSut();
    expect(sut.props.updatedAt).toBeNull();
    expect(sut.props.updatedAt).not.toBeUndefined();
  });

  it('should create a purchase list with a valid id', () => {
    const id = new UniqueEntityId('5c84559c9ea984bd9b1f2bc6');
    const sut = makeSut([], id);
    expect(sut.id).not.toBeUndefined();
    expect(sut.id).not.toBeNull();
    expect(typeof sut.id).toEqual('string');
  });
});
