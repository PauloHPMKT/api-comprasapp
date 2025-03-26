import { AddAccountRepository } from '@/modules/account/data/protocols/add-account-repository';
import { AddAccountModel } from '@/modules/account/domain/models/add-account-model';
import { AddAccountService } from './protocols/add-account';

export class AccountService implements AddAccountService {
  constructor(private readonly addAccountRepository: AddAccountRepository) {}

  async addAccount(account: AddAccountModel.Params): Promise<void> {
    await this.addAccountRepository.add(account);
  }
}
