import { Encrypter } from '../protocols/encrypter';
import { AddSignup } from '../../domain/usecases/add-signup';
import { SignupModel } from '../../domain/models/add-signup';
import { User } from '@/modules/user/domain/entities/User';
import { Account } from '@/modules/account/domain/entities/Acount';
import { InvalidParamError } from '@/shared/presentation/errors';
import {
  VerifyEmailService,
  AddUserService,
} from '@/shared/services/user/protocols';
import { AddAccountService } from '@/shared/services/account/protocols/add-account';

export class AddSignupUseCase implements AddSignup {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly verifyEmalService: VerifyEmailService,
    private readonly addUserService: AddUserService,
    private readonly addAccountService: AddAccountService,
  ) {}

  async add(params: SignupModel.Params): Promise<SignupModel.Result> {
    if (params.password !== params.passwordConfirmation) {
      throw new InvalidParamError('passwordConfirmation');
    }

    const isUser = await this.verifyEmalService.verifyEmail(params.email);
    if (isUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await this.encrypter.encrypt(params.password);
    const userData = {
      name: params.name,
      email: params.email,
      password: hashedPassword,
    } as SignupModel.Params;

    const { user, account } = this.createUserAccount(userData);

    const userAccount = await this.addUserService.addUser(user);
    await this.addAccountService.addAccount(account);

    return userAccount;
  }

  private createUserAccount(params: SignupModel.Params) {
    const createUser = new User({
      name: params.name,
      email: params.email,
      password: params.password,
    });
    const account = Account.create({ userId: createUser.id }).toJSON();
    createUser.assignAccountId(account.id);

    const user = createUser.toJSON();
    return {
      user,
      account,
    };
  }
}
