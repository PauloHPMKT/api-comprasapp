import { AuthSignInModel } from '../models/auth-signin';

export interface SignIn {
  login(data: AuthSignInModel.SignIn): Promise<AuthSignInModel.SignInResult>;
}
