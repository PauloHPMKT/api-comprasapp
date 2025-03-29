import { AccountService } from '@/shared/services/account/account-service';
import { AddAccountRepository } from '@/modules/account/data/protocols/add-account-repository';
import { AddAccountModel } from '@/modules/account/domain/models/add-account-model';
import { Account } from '@/modules/account/domain/entities/Acount';

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountModel.Params): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new AddAccountRepositoryStub();
};

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new AccountService(addAccountRepositoryStub);
  return {
    sut,
    addAccountRepositoryStub,
  };
};

type SutTypes = {
  sut: AccountService;
  addAccountRepositoryStub: AddAccountRepository;
};

describe('AccountService', () => {
  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = {
      id: 'valid_id',
      userId: 'valid_user_id',
      isActive: true,
      plan: 'free' as Account.Plan,
      createdAt: new Date(),
    };
    await sut.addAccount(accountData);
    expect(addSpy).toHaveBeenCalledWith(accountData);
  });
});
