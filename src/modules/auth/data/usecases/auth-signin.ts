import { AuthSignInModel } from '../../domain/models/auth-signin';
import { SignIn } from '../../domain/usecases/auth-signin';
import { FindUserByEmailRepository } from '@/shared/services/user/protocols/find-user-by-email';

export class AuthSigninUseCase implements SignIn {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
  ) {}

  async signIn(data: AuthSignInModel.Params): Promise<AuthSignInModel.Result> {
    const { email, password } = data;
    const user = await this.findUserByEmailRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found with this email');
    }

    return new Promise((resolve) =>
      resolve({
        user: {
          id: 'any_id',
          name: 'any_name',
          email: email,
        },
        access_token: 'any_token',
      }),
    );
  }
}
