import { User } from '@/modules/user/domain/entities/User';
import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account';
import { SignupDto } from '../dto/signup-dto';
import { Encrypter } from '../protocols/encypter';
import { VerifyUserRepository } from '../protocols/verify-user-repository';
import { CreateUserRepository } from '../protocols/create-user-repository';

export class AddAccountUseCase extends AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly verifyAccountRepository: VerifyUserRepository,
    private readonly createUserRepository: CreateUserRepository,
  ) {
    super();
  }

  async add(accountData: SignupDto): Promise<AddAccountModel.Result | Error> {
    const passwordError = accountData.matchPassword();
    if (passwordError) {
      return passwordError;
    }

    const userExists = await this.verifyAccountRepository.verify(
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
    await this.createUserRepository.create(user);

    return new Promise((resolve) =>
      resolve({
        id: 'valid_id',
        name: 'validname',
        email: 'validemail@mail.com',
      }),
    );
  }
}
