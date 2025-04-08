import { AuthSignInModel } from '../models/auth-signin';

export interface ValidateUserSignIn {
  validate(data: AuthSignInModel.Params): Promise<AuthSignInModel.Result>;
}
