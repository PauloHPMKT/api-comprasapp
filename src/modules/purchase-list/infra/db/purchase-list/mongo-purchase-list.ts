import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { VerifyListRepository } from '../../../data/protocols/verify-list-repository';
import { AddPurchaseListRepository } from '@/modules/purchase-list/data/protocols/add-purchase-list-repository';
import { PurchaseListRepoModel } from '@/modules/purchase-list/data/models/purchase-list';

export class MongoPurchaseListRepository
  implements VerifyListRepository, AddPurchaseListRepository
{
  async verify(title: string): Promise<boolean> {
    const purchaseList = await MongoHelper.getCollection(
      'purchase-list',
    ).findOne({ title });
    return !!purchaseList;
  }

  async addList(
    data: PurchaseListRepoModel.Params,
  ): Promise<PurchaseListRepoModel.Result> {
    const purchaseListCollection =
      await MongoHelper.getCollection('purchase-list');
    const { insertedId } = await purchaseListCollection.insertOne({
      _id: MongoHelper.toObjectId(data.id),
      title: data.title,
      description: data.description,
      products: data.products,
      userId: MongoHelper.toObjectId(data.userId),
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
    const purchaseList = await purchaseListCollection.findOne({
      _id: insertedId,
    });
    return MongoHelper.map(purchaseList);
  }
}
