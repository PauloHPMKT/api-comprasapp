import { AddAccountModel } from '@/modules/account/domain/models/add-account-model';

export interface AddAccountService {
  addAccount(account: AddAccountModel.Params): Promise<void>;
}
