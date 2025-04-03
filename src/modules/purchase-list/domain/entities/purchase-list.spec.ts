import { PurchaseList } from './PurchaseList';

const makeSut = (): PurchaseList => {
  const sut = new PurchaseList();
  return sut;
};

describe('PurchaseList', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(PurchaseList);
    expect(sut).toBeTruthy();
  });
});
