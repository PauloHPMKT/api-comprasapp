import { JwtAdapter } from '@/modules/auth/infra/jwt/jwt-adapter';
import { AuthService } from '@/shared/services/auth/auth-service';

export const makeAuthService = (): AuthService => {
  const jwtAdapter = new JwtAdapter();
  return new AuthService(jwtAdapter);
};
