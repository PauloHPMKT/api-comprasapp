import { SignupModel } from '../models/add-signup';

export interface AddSignup {
  add(params: SignupModel.Params): Promise<SignupModel.Result>;
}
