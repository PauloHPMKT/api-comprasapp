import { ProductProps, PurchaseList } from './PurchaseList';

const makeSut = (): PurchaseList => {
  const purchaseList: ProductProps = {
    title: 'List title',
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
});
