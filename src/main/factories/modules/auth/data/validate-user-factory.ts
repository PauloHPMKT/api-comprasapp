import { ValidateUserUseCase } from '@/modules/auth/data/usecases/validate-user';
import { BcryptAdapter } from '@/shared/infra/cryptography/bcrypt-adapter';
import { makeUserServiceFactory } from '../../services/user/user-service-factory';

const salt = 12;
export const makeValidateUserFactory = (): ValidateUserUseCase => {
  const findUserByEmailRepository = makeUserServiceFactory();
  const compareHashStub = new BcryptAdapter(salt);

  return new ValidateUserUseCase(findUserByEmailRepository, compareHashStub);
};
