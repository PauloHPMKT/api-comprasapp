import { CreatePurchaseListController } from '@/modules/purchase-list/presentation/controller/create-purchase-list';
import { makeAddPurchaseListUseCase } from '../data/add-purchase-list';

export const makeCreatePurchaseListController =
  (): CreatePurchaseListController => {
    const addPurchaseListUseCase = makeAddPurchaseListUseCase();

    return new CreatePurchaseListController(addPurchaseListUseCase);
  };
