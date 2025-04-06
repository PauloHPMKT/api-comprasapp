import { PurchaseListRepoModel } from '../models/purchase-list';

export interface AddPurchaseListRepository {
  addList(
    data: PurchaseListRepoModel.Params,
  ): Promise<PurchaseListRepoModel.Result>;
}
