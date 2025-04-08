import { FindUserByEmailRepository } from '@/shared/services/user/protocols/find-user-by-email';
import { AuthSigninUseCase } from './auth-signin';
import { UserModel } from '@/modules/user/domain/models/user-model';

const makeFindUserByEmail = (): FindUserByEmailRepository => {
  class FindUserByEmailStub implements FindUserByEmailRepository {
    async findByEmail(email: string): Promise<UserModel.Params> {
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
  return new FindUserByEmailStub();
};

const makeSut = (): SutTypes => {
  const findUserByEmailRepositoryStub = makeFindUserByEmail();
  const sut = new AuthSigninUseCase(findUserByEmailRepositoryStub);
  return {
    sut,
    findUserByEmailRepositoryStub,
  };
};

type SutTypes = {
  sut: AuthSigninUseCase;
  findUserByEmailRepositoryStub: FindUserByEmailRepository;
};

describe('AuthSigninUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AuthSigninUseCase);
    expect(sut).toBeTruthy();
  });

  it('should return null if credentials are invalid', async () => {
    const { sut } = makeSut();
    const params = {
      email: 'invalid_email@mail.com',
      password: 'invalid_password',
    };
    const result = await sut.signIn(params);
    expect(result).toBeNull();
  });
});
