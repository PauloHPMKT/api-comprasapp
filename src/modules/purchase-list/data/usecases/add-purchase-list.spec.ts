import { AddPurchaseListUseCase } from './add-purchase-list';

const makeSut = (): AddPurchaseListUseCase => {
  return new AddPurchaseListUseCase();
};

describe('AddPurchaseListUseCase', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AddPurchaseListUseCase);
    expect(sut).toBeTruthy();
  });
});
