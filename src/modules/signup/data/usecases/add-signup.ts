import { Encrypter } from '../protocols/encrypter';
import { AddSignup } from '../../domain/usecases/add-signup';
import { SignupModel } from '../../domain/models/add-signup';
import { User } from '@/modules/user/domain/entities/User';
import { Account } from '@/modules/account/domain/entities/Acount';
import { InvalidParamError } from '@/shared/presentation/errors';
import { AddAccountRepository } from '@/modules/account/data/protocols/add-account-repository';
import {
  VerifyEmailService,
  AddUserService,
} from '@/shared/services/protocols';

export class AddSignupUseCase implements AddSignup {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly verifyEmalService: VerifyEmailService,
    private readonly addUserService: AddUserService,
    private readonly addAccountRepository: AddAccountRepository,
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
    await this.addAccountRepository.add(account);

    return userAccount;
  }

  private createUserAccount(params: SignupModel.Params) {
    const createUser = User.create({
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
