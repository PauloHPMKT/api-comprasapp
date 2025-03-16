import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account';
import { SignupDto } from '../dto/signup-dto';

export class AddAccountUseCase extends AddAccount {
  async add(accountData: SignupDto): Promise<AddAccountModel.Result | Error> {
    const passwordError = accountData.matchPassword();
    if (passwordError) {
      return passwordError;
    }
    return new Promise((resolve) =>
      resolve({
        id: 'valid_id',
        name: 'validname',
        email: 'validemail@mail.com',
      }),
    );
  }
}
