import {
  Encrypter,
  VerifyUserRepository,
  CreateUserRepository,
  AddAccountRepository,
} from '../protocols';
import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account';
import { User } from '@/modules/user/domain/entities/User';
import { SignupDto } from '../dto/signup-dto';
import { Account } from '@/modules/account/domain/enities/Account';

export class AddAccountUseCase extends AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly verifyUserRepository: VerifyUserRepository,
    private readonly createUserRepository: CreateUserRepository,
    private readonly addAccountRepository: AddAccountRepository,
  ) {
    super();
  }

  async add(accountData: SignupDto): Promise<AddAccountModel.Result | Error> {
    const passwordError = accountData.matchPassword();
    if (passwordError) {
      return passwordError;
    }

    const userExists = await this.verifyUserRepository.verify(
      accountData.email,
    );
    // TODO: Verify account status to call account module to send email to reabilitate account
    if (userExists) {
      throw new Error('Account already exist');
    }

    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const user = new User({
      name: accountData.name,
      email: accountData.email,
      password: hashedPassword,
    });

    const account = new Account({ userId: user.id });
    await this.addAccountRepository.add(account);

    user.assignAccountId(account.id);
    await this.createUserRepository.create(user);

    return {
      id: account.id,
      name: user.name,
      email: user.email,
      accountId: user.accountId,
    };
  }
}
