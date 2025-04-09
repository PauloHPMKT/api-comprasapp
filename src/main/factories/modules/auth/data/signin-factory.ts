import { SignInUseCase } from '@/modules/auth/data/usecases/signin';
import { JwtGenerateToken } from '@/modules/auth/infra/jwt/jwt-generate-token';

export const makeSignInFactory = (): SignInUseCase => {
  const jwtAdapter = new JwtGenerateToken();
  return new SignInUseCase(jwtAdapter);
};
