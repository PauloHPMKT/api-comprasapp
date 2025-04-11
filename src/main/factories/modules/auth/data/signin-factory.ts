import { SignInUseCase } from '@/modules/auth/data/usecases/signin';
import { JwtAdapter } from '@/modules/auth/infra/jwt/jwt-adapter';

export const makeSignInFactory = (): SignInUseCase => {
  const jwtAdapter = new JwtAdapter();
  return new SignInUseCase(jwtAdapter);
};
