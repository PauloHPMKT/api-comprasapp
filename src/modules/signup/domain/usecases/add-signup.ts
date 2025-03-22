import { SignupModel } from '../../data/models/add-signup';

export interface AddSignup {
  add(params: SignupModel.Params): Promise<SignupModel.Result>;
}
