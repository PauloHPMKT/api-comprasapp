import { CreatePurchaseListController } from './create-purshase-list';

const makeSut = () => {
  return new CreatePurchaseListController();
};

describe('CreatePurchaseListController', () => {
  it('should be true', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });
});
