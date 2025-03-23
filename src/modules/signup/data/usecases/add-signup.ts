import { AddSignup } from '../../domain/usecases/add-signup';
import { SignupModel } from '../models/add-signup';
import { Encrypter } from '../protocols/encrypter';
import { VerifyEmailRepository } from '../protocols/verify-email-repository';

export class AddSignupUseCase implements AddSignup {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly verifyEmailRepository: VerifyEmailRepository,
  ) {}

  async add(params: SignupModel.Params): Promise<SignupModel.Result> {
    if (params.password !== params.passwordConfirmation) {
      throw new Error('Invalid Param: passwordConfirmation');
    }

    const isUser = await this.verifyEmailRepository.verify(params.email);
    if (isUser) {
      throw new Error('Email already exists');
    }

    await this.encrypter.encrypt(params.password);

    // criptografar a senha

    // criar um novo usuário

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
