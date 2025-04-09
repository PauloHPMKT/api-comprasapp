import { UserModel } from '@/modules/user/domain/models/user-model';

export interface FindUserByEmailService {
  findByEmail(email: string): Promise<UserModel.Params>;
}
