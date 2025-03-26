import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { UserModel } from '../../../domain/models/user-model';
import {
  VerifyEmailRepository,
  AddUserRepository,
} from '../../../data/protocols';

export class MongoUserRepository
  implements VerifyEmailRepository, AddUserRepository
{
  async verify(email: string): Promise<boolean> {
    const userCollection = MongoHelper.getCollection('users');
    const isUser = await userCollection.findOne({ email });
    return !!isUser;
  }

  async create(data: UserModel.Params): Promise<UserModel.Params> {
    const userCollection = MongoHelper.getCollection('users');
    const { insertedId } = await userCollection.insertOne({
      _id: MongoHelper.toObjectId(data.id),
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
      accountId: MongoHelper.toObjectId(data.accountId),
      createdAt: data.createdAt,
    });

    const user = await userCollection.findOne({ _id: insertedId });
    return MongoHelper.map(user);
  }
}
