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

        const validUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          accountId: user.accountId,
          createdAt: user.createdAt,
        };

        return validUser;
      }
    }
    return null;
  }
}
