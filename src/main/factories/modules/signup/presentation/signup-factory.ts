import { SignupController } from '@/modules/signup/presentation/controller/signup';
import { makeAddSignupUseCaseFactory } from '../data/add-signup-factory';

export const makeSignupControllerFactory = (): SignupController => {
  const addSignupUseCase = makeAddSignupUseCaseFactory();

  return new SignupController(addSignupUseCase);
};
