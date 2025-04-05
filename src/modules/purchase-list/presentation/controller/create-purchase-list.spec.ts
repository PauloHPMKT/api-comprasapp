import { CreatePurchaseListController } from './create-purchase-list';

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
});
