import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { VerifyListRepository } from '../../../data/protocols/verify-list-repository';

export class MongoPurchaseListRepository implements VerifyListRepository {
  async verify(title: string): Promise<boolean> {
    const purchaseList = await MongoHelper.getCollection(
      'purchase-list',
    ).findOne({ title });
    return !!purchaseList;
  }
}
