import { SignupModel } from '../models/signup';

export interface AddSignup {
  execute(params: SignupModel.Params): Promise<any>;
}
