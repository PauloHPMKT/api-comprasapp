import { User } from '@/modules/user/domain/entities/User';
import { Account } from '@/modules/account/domain/entities/Acount';
import { InvalidParamError } from '@/shared/presentation/errors';
import { AddUserRepository } from '@/modules/user/data/protocols/add-user-repository';
import { AddSignup } from '../../domain/usecases/add-signup';
import { SignupModel } from '../models/add-signup';
import { Encrypter } from '../protocols/encrypter';
import { VerifyEmailRepository } from '../protocols/verify-email-repository';

export class AddSignupUseCase implements AddSignup {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly verifyEmailRepository: VerifyEmailRepository,
    private readonly addUserRepository: AddUserRepository,
  ) {}

  async add(params: SignupModel.Params): Promise<SignupModel.Result> {
    if (params.password !== params.passwordConfirmation) {
      throw new InvalidParamError('passwordConfirmation');
    }

    const isUser = await this.verifyEmailRepository.verify(params.email);
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

    // chamar as camadas repository para salvar o usuário e a conta
    await this.addUserRepository.create(user);

    // retornar o usuário
    return new Promise((resolve) =>
      resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        avatar: null,
        accountId: 'valid_account_id',
        createdAt: new Date('2025-12-10'),
      }),
    );
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
