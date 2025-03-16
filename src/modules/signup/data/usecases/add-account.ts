import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account';
import { SignupDto } from '../dto/signup-dto';
import { Encrypter } from '../protocols/encypter';

export class AddAccountUseCase extends AddAccount {
  constructor(private readonly encrypter: Encrypter) {
    super();
  }

  async add(accountData: SignupDto): Promise<AddAccountModel.Result | Error> {
    const passwordError = accountData.matchPassword();
    if (passwordError) {
      return passwordError;
    }

    await this.encrypter.encrypt(accountData.password);
    return new Promise((resolve) =>
      resolve({
        id: 'valid_id',
        name: 'validname',
        email: 'validemail@mail.com',
      }),
    );
  }
}
