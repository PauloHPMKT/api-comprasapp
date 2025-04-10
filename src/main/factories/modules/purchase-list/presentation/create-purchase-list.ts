import { CreatePurchaseListController } from '@/modules/purchase-list/presentation/controller/create-purchase-list';
import { makeAddPurchaseListUseCase } from '../data/add-purchase-list';
import { makeAuthService } from '../../services/auth/auth-service-factory';

export const makeCreatePurchaseListController =
  (): CreatePurchaseListController => {
    const authService = makeAuthService();
    const addPurchaseListUseCase = makeAddPurchaseListUseCase();

    return new CreatePurchaseListController(
      addPurchaseListUseCase,
      authService,
    );
  };
