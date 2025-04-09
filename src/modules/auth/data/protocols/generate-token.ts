import { AuthSignInModel } from '../../domain/models/auth-signin';

export interface GenerateToken {
  sign(payload: AuthSignInModel.SignIn): string;
}
