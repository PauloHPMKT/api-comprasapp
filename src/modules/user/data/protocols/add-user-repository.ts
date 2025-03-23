import { UserModel } from '../../domain/models/user-model';

export interface AddUserRepository {
  create(data: UserModel.Params): Promise<UserModel.Params>;
}
