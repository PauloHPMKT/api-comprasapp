import { MongoUserRepository } from '@/modules/user/infra/db/mongo/mongo-user-repository';
import { UserService } from '@/shared/services/user/user-service';

export const makeUserServiceFactory = (): UserService => {
  const mongoUserRepository = new MongoUserRepository();
  const verifyEmailRepository = mongoUserRepository;
  const addUserRepository = mongoUserRepository;
  const findUserByEmailRepository = mongoUserRepository;

  return new UserService(
    verifyEmailRepository,
    addUserRepository,
    findUserByEmailRepository,
  );
};
