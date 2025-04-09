import { AuthSignInModel } from '../../domain/models/auth-signin';
import { ValidateUserSignIn } from '../../domain/usecases/validate-user';
import { FindUserByEmailService } from '@/shared/services/user/protocols';
import { CompareCrypto } from '@/modules/signup/data/protocols/compare-crypto';

export class ValidateUserUseCase implements ValidateUserSignIn {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailService,
    private readonly encrypter: CompareCrypto,
  ) {}

  async validate(
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
