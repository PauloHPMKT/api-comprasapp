import { AddAccountModel } from '@/modules/account/domain/models/add-account-model';
import { AddAccountRepository } from '../../../data/protocols/add-account-repository';
import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';

export class MongoAccountRepository implements AddAccountRepository {
  async add(account: AddAccountModel.Params): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.insertOne({
      id: account.id,
      userId: account.userId,
      isActive: account.isActive,
      plan: account.plan,
      createdAt: account.createdAt,
    });
  }
}
