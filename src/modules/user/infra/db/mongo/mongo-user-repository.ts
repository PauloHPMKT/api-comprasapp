import { UserModel } from '../../../domain/models/user-model';
import {
  VerifyEmailRepository,
  AddUserRepository,
} from '../../../data/protocols';
import { MongoHelper } from '../helper/mongo-client';

export class MongoUserRepository
  implements VerifyEmailRepository, AddUserRepository
{
  async verify(email: string): Promise<boolean> {
    const getCollection = MongoHelper.getCollection('users');
    const isUser = await getCollection.findOne({ email });
    return !!isUser;
  }

  async create(data: UserModel.Params): Promise<UserModel.Params> {
    const userCollection = MongoHelper.getCollection('users');
    const { insertedId } = await userCollection.insertOne({
      _id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
      accountId: data.accountId,
      createdAt: data.createdAt,
    });

    const user = await userCollection.findOne({ _id: insertedId });
    return MongoHelper.map(user);
  }
}
