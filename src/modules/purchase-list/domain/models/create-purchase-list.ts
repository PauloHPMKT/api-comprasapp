import { Products } from '../entities/PurchaseList';

export namespace PurchaseListModel {
  export interface Params {
    title: string;
    description?: string | null;
    products: Products.toCreate[];
  }

  export type Result = {
    id: string;
    title: string;
    description: string | null;
    products: Products.toCreate[];
    userId: string;
    createdAt: Date;
    updatedAt: Date | null;
  };
}
