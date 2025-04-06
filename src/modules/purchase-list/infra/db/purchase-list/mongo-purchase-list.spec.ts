import { MongoPurchaseListRepository } from './mongo-purchase-list';

const makeSut = (): MongoPurchaseListRepository => {
  return new MongoPurchaseListRepository();
};

describe('MongoPurchaseListRepository', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(MongoPurchaseListRepository);
    expect(sut).toBeTruthy();
  });
});
