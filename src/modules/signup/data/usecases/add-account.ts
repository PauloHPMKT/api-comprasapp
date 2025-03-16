import { User } from '@/modules/user/domain/entities/User';
import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account';
import { SignupDto } from '../dto/signup-dto';
import { Encrypter } from '../protocols/encypter';
import { VerifyAccountRepository } from '../protocols/verify-account-repository';

export class AddAccountUseCase extends AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly verifyAccountRepository: VerifyAccountRepository,
  ) {
    super();
  }

  async add(accountData: SignupDto): Promise<AddAccountModel.Result | Error> {
    const passwordError = accountData.matchPassword();
    if (passwordError) {
      return passwordError;
    }

    const accountExist = await this.verifyAccountRepository.verify(
      accountData.email,
    );
    if (accountExist) {
      throw new Error('Account already exist');
    }

    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const user = new User({
      name: accountData.name,
      email: accountData.email,
      password: hashedPassword,
    });

    return new Promise((resolve) =>
      resolve({
        id: 'valid_id',
        name: 'validname',
        email: 'validemail@mail.com',
      }),
    );
  }
}
