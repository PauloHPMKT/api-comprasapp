import { MongoAccountRepository } from '@/modules/account/infra/db/mongo/mongo-account-repository';
import { AccountService } from '@/shared/services/account/account-service';

export const makeAccountServiceFactory = () => {
  const accountRepository = new MongoAccountRepository();
  return new AccountService(accountRepository);
};
