import { UserModel } from '../../domain/models/user-model';

export interface FindUserByEmailRepository {
  findByEmail(email: string): Promise<UserModel.Params>;
}
