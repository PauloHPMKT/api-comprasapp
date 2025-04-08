import { AuthSignInModel } from '../../domain/models/auth-signin';
import { SignIn } from '../../domain/usecases/auth-signin';
import { FindUserByEmailRepository } from '@/shared/services/user/protocols/find-user-by-email';
import { CompareCrypto } from '@/modules/signup/data/protocols/compare-crypto';

export class AuthSigninUseCase implements SignIn {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly encrypter: CompareCrypto,
  ) {}

  async signIn(
    data: AuthSignInModel.Params,
  ): Promise<AuthSignInModel.Result | null> {
    const { email, password } = data;
    const user = await this.findUserByEmailRepository.findByEmail(email);
    if (user) {
      const comparePassword = await this.encrypter.compareHash(
        password,
        user.password,
      );

      if (comparePassword) {
        user.password = undefined;

        return new Promise((resolve) =>
          resolve({
            id: 'valid_id',
            name: 'valid_username',
            email: 'valid_email@mail.com',
            avatar: null,
            accountId: 'valid_account_id',
            createdAt: new Date('2025-01-01'),
          }),
        );
      }
    }
    return null;
  }
}
