import { AuthController } from '@/modules/auth/presentation/controllers/auth';
import { makeValidateUserFactory } from '../data/validate-user-factory';
import { makeSignInFactory } from '../data/signin-factory';

export const makeAuthControllerFactory = (): AuthController => {
  const validateUserUseCase = makeValidateUserFactory();
  const signInUseCase = makeSignInFactory();

  return new AuthController(validateUserUseCase, signInUseCase);
};
