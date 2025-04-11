import { UserModel } from '@/modules/user/domain/models/user-model';

export interface AddUserService {
  addUser(user: UserModel.Params): Promise<UserModel.Params>;
}
