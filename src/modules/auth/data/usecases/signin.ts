import { AuthSignInModel } from '../../domain/models/auth-signin';
import { SignIn } from '../../domain/usecases/signin';
import { GenerateToken } from '../protocols/generate-token';

export class SignInUseCase implements SignIn {
  constructor(private readonly generateWebtoken: GenerateToken) {}

  async login(
    data: AuthSignInModel.SignIn,
  ): Promise<AuthSignInModel.SignInResult> {
    const payload = {
      id: data.id,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      accountId: data.accountId,
      createdAt: data.createdAt,
    };

    const token = await this.generateWebtoken.sign(payload);

    return new Promise((resolve) =>
      resolve({
        user: payload,
        access_token: 'valid_token',
      }),
    );
  }
}
