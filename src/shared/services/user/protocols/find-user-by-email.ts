import { UserModel } from '@/modules/user/domain/models/user-model';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<UserModel.Params>;
}
