import { InvalidParamError } from '@/shared/presentation/errors';
import { AddSignup } from '../../domain/usecases/add-signup';
import { SignupModel } from '../models/add-signup';
import { Encrypter } from '../protocols/encrypter';
import { VerifyEmailRepository } from '../protocols/verify-email-repository';
import { User } from '@/modules/user/domain/entities/User';
import { Account } from '@/modules/account/domain/entities/Acount';

export class AddSignupUseCase implements AddSignup {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly verifyEmailRepository: VerifyEmailRepository,
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

    // criar um novo usuário
    const user = User.create({
      name: params.name,
      email: params.email,
      password: hashedPassword,
    });
    const account = Account.create({ userId: user.id });

    // criar uma conta para o usuário e vincular ao usuário

    // salvar no banco de dados

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
}
