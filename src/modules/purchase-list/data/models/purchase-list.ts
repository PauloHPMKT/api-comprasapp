import { Products, PurchaseList } from '../../domain/entities/PurchaseList';

export namespace PurchaseListRepoModel {
  export type Params = ReturnType<PurchaseList['toJSON']>;

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
