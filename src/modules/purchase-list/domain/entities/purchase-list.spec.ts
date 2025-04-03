import { ProductProps, PurchaseList } from './PurchaseList';

const makeSut = (): PurchaseList => {
  const purchaseList: ProductProps = {
    title: 'List title',
    products: [
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
  };
  const sut = new PurchaseList(purchaseList);
  return sut;
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
});
