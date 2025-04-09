import { UserService } from '@/shared/services/user/user-service';
import {
  VerifyEmailRepository,
  AddUserRepository,
} from '@/modules/user/data/protocols';
import { FindUserByEmailService } from './protocols';
import { UserModel } from '@/modules/user/domain/models/user-model';

const makeFindUserByEmailRepository = (): FindUserByEmailService => {
  class FindUserByEmailRepositoryStub implements FindUserByEmailService {
    async findByEmail(email: string): Promise<UserModel.Params | null> {
      return new Promise((resolve) =>
        resolve({
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'hashed_password',
          avatar: null,
          accountId: 'any_account_id',
          createdAt: new Date('2025-01-01'),
        }),
      );
    }
  }
  return new FindUserByEmailRepositoryStub();
};

const makeVerifyEmailRepository = (): VerifyEmailRepository => {
  class VerifyEmailRepositoryStub implements VerifyEmailRepository {
    async verify(email: string): Promise<boolean> {
      return new Promise((resolve) => resolve(false));
    }
  }
  return new VerifyEmailRepositoryStub();
};

const makeAddUserRepository = (): AddUserRepository => {
  class AddUserRepositoryStub implements AddUserRepository {
    async create(user: any): Promise<any> {
      return new Promise((resolve) =>
        resolve({
          id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'valid_password',
          avatar: null,
          accountId: 'valid_account_id',
          createdAt: new Date('2025-12-10'),
        }),
      );
    }
  }
  return new AddUserRepositoryStub();
};

const makeSut = (): SutTypes => {
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository();
  const verifyEmailRepositoryStub = makeVerifyEmailRepository();
  const addUserRepositoryStub = makeAddUserRepository();
  const sut = new UserService(
    verifyEmailRepositoryStub,
    addUserRepositoryStub,
    findUserByEmailRepositoryStub,
  );
  return {
    sut,
    verifyEmailRepositoryStub,
    addUserRepositoryStub,
    findUserByEmailRepositoryStub,
  };
};

type SutTypes = {
  sut: UserService;
  verifyEmailRepositoryStub: VerifyEmailRepository;
  addUserRepositoryStub: AddUserRepository;
  findUserByEmailRepositoryStub: FindUserByEmailService;
};

describe('UserService', () => {
  it('should call VerifyEmailRepository with correct email', async () => {
    const { sut, verifyEmailRepositoryStub } = makeSut();
    const verifySpy = jest.spyOn(verifyEmailRepositoryStub, 'verify');
    const email = 'anyemail@mail.com';
    await sut.verifyEmail(email);
    expect(verifySpy).toHaveBeenCalledWith(email);
  });

  it('should return true if VerifyEmailRepository returns true', async () => {
    const { sut, verifyEmailRepositoryStub } = makeSut();
    jest.spyOn(verifyEmailRepositoryStub, 'verify').mockResolvedValueOnce(true);
    const email = 'anyemail@mail.com';
    const isEmail = await sut.verifyEmail(email);
    expect(isEmail).toBe(true);
  });

  it('should call AddUserRepository with correct user data', async () => {
    const { sut, addUserRepositoryStub } = makeSut();
    const createUserSpy = jest.spyOn(addUserRepositoryStub, 'create');
    const userData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
      avatar: null,
      accountId: 'valid_account_id',
      createdAt: new Date('2025-12-10'),
    };
    await sut.addUser(userData);
    expect(createUserSpy).toHaveBeenCalledWith(userData);
  });

  it('should return a valid user if findUserByEmailRepository returns a user', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut();
    const findUserSpy = jest.spyOn(
      findUserByEmailRepositoryStub,
      'findByEmail',
    );
    const fakeEmail = 'any_email@mail.com';
    const user = await sut.findByEmail(fakeEmail);
    expect(findUserSpy).toHaveBeenCalledWith(fakeEmail);
    expect(user).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
      avatar: null,
      accountId: 'any_account_id',
      createdAt: new Date('2025-01-01'),
    });
  });
});
