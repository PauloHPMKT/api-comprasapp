import { AddAccountModel } from '../../domain/models/add-account-model';

export interface AddAccountRepository {
  add(data: AddAccountModel.Params): Promise<void>;
}
