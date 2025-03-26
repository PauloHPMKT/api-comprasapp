import { VerifyEmailRepository } from '../../../data/protocols';
import { MongoHelper } from '../helper/mongo-client';

export class MongoUserRepository implements VerifyEmailRepository {
  async verify(email: string): Promise<boolean> {
    const getCollection = MongoHelper.getCollection('users');
    const isUser = await getCollection.findOne({ email });
    return !!isUser;
  }
}
