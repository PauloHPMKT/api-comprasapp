import { MongoAccountRepository } from '@/modules/account/infra/db/mongo/mongo-account-repository';
import { AddSignupUseCase } from '@/modules/signup/data/usecases/add-signup';
import { BcryptAdapter } from '@/modules/signup/infra/cryptography/bcrypt-adapter';
import { MongoUserRepository } from '@/modules/user/infra/db/mongo/mongo-user-repository';
import { AccountService } from '@/shared/services/account/account-service';
import { UserService } from '@/shared/services/user/user-service';

const makeBcryptAdapterFactory = (): BcryptAdapter => {
  const salt = 12;
  return new BcryptAdapter(salt);
};

const makeUserServicesFactory = () => {
  const userRepository = new MongoUserRepository();
  const verifyEmailRepository = userRepository;
  const addUserRepository = userRepository;
  const userService = new UserService(verifyEmailRepository, addUserRepository);

  return {
    verifyEmailService: userService,
    addUserService: userService,
  };
};

const makeAccountServiceFactory = () => {
  const accountRepository = new MongoAccountRepository();
  return new AccountService(accountRepository);
};

export const makeAddSignupUseCaseFactory = (): AddSignupUseCase => {
  const bcryptAdapter = makeBcryptAdapterFactory();
  const verifyEmailRepository = makeUserServicesFactory().verifyEmailService;
  const addUserRepository = makeUserServicesFactory().addUserService;
  const addAccountService = makeAccountServiceFactory();

  return new AddSignupUseCase(
    bcryptAdapter,
    verifyEmailRepository,
    addUserRepository,
    addAccountService,
  );
};
