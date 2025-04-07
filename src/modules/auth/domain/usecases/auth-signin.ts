import { AuthSignInModel } from '../models/auth-signin';

export interface SignIn {
  signIn(data: AuthSignInModel.Params): Promise<AuthSignInModel.Result>;
}
