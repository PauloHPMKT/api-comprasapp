import { BcryptAdapter } from '@/shared/infra/cryptography/bcrypt-adapter';
import { makeUserServiceFactory } from '../../services/user/user-service-factory';
import { makeAccountServiceFactory } from '../../services/account/account-service-factory';
import { AddSignupUseCase } from '@/modules/signup/data/usecases/add-signup';

const makeBcryptAdapterFactory = (): BcryptAdapter => {
  const salt = 12;
  return new BcryptAdapter(salt);
};

export const makeAddSignupUseCaseFactory = (): AddSignupUseCase => {
  const bcryptAdapter = makeBcryptAdapterFactory();
  const verifyEmailRepository = makeUserServiceFactory();
  const addUserRepository = makeUserServiceFactory();
  const addAccountService = makeAccountServiceFactory();

  return new AddSignupUseCase(
    bcryptAdapter,
    verifyEmailRepository,
    addUserRepository,
    addAccountService,
  );
};
