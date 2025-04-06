import { PurchaseListModel } from '../models/create-purchase-list';

export interface AddPurchaseList {
  add(data: PurchaseListModel.Params): Promise<PurchaseListModel.Result>;
}
