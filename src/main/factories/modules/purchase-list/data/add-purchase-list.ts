import { AddPurchaseListUseCase } from '@/modules/purchase-list/data/usecases/add-purchase-list';
import { MongoPurchaseListRepository } from '@/modules/purchase-list/infra/db/purchase-list/mongo-purchase-list';

export const makeAddPurchaseListUseCase = (): AddPurchaseListUseCase => {
  const mongoPurchaseListRepository = new MongoPurchaseListRepository();
  const verifyListRepository = mongoPurchaseListRepository;
  const addPurchaseListRepository = mongoPurchaseListRepository;

  return new AddPurchaseListUseCase(
    verifyListRepository,
    addPurchaseListRepository,
  );
};
