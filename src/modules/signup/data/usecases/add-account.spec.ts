import { InvalidParamError } from '@/modules/shared/presentation/errors';
import { AddAccountUseCase } from './add-account';
import { SignupDto } from '../dto/signup-dto';
import { Encrypter } from '../protocols/encypter';
import { VerifyUserRepository } from '../protocols/verify-user-repository';
import { CreateUserRepository } from '../protocols/create-user-repository';
import { AddAccountRepository } from '../protocols/add-account-repository';

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: any): Promise<any> {
      return new Promise((resolve) =>
        resolve({
          id: 'valid_id',
          userId: 'valid_id',
          status: 'valid_status',
          plan: 'valid_plan',
          createdAt: new Date('2025-12-25'),
          updatedAt: null,
        }),
      );
    }
  }
  return new AddAccountRepositoryStub();
};

const makeCreateUserRepository = (): CreateUserRepository => {
  class CreateUserRepositoryStub implements CreateUserRepository {
    async create(data: any): Promise<any> {
      return new Promise((resolve) =>
        resolve({
          id: expect.any(String),
          name: 'validname',
          email: 'validemail@mail.com',
          password: 'hashed_password',
          accountId: expect.any(String),
          avatar: null,
          createdAt: expect.any(Date),
        }),
      );
    }
  }
  return new CreateUserRepositoryStub();
};

const makeVerifyAccountRepository = (): VerifyUserRepository => {
  class VerifyAccountRepositoryStub implements VerifyUserRepository {
    async verify(value: string): Promise<boolean> {
      return new Promise((resolve) => resolve(false));
    }
  }
  return new VerifyAccountRepositoryStub();
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return 'hashed_password';
    }
  }
  return new EncrypterStub();
};

const makeSut = (): SutTypes => {
  const addAccountRepository = makeAddAccountRepository();
  const createUserRepositoryStub = makeCreateUserRepository();
  const verifyUserExistStub = makeVerifyAccountRepository();
  const encrypterStub = makeEncrypter();
  const sut = new AddAccountUseCase(
    encrypterStub,
    verifyUserExistStub,
    createUserRepositoryStub,
    addAccountRepository,
  );
  return {
    sut,
    encrypterStub,
    verifyUserExistStub,
    createUserRepositoryStub,
    addAccountRepository,
  };
};

interface SutTypes {
  sut: AddAccountUseCase;
  encrypterStub: Encrypter;
  verifyUserExistStub: VerifyUserRepository;
  createUserRepositoryStub: CreateUserRepository;
  addAccountRepository: AddAccountRepository;
}

describe('AddAccount', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return an error if password not match', async () => {
    const { sut } = makeSut();
    const accountData = new SignupDto({
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'invalidpassword',
    });
    const response = await sut.add(accountData);
    expect(response).toEqual(new InvalidParamError('passwordConfirmation'));
  });

  it('should throw if a user already exists', async () => {
    const { sut, verifyUserExistStub } = makeSut();
    jest
      .spyOn(verifyUserExistStub, 'verify')
      .mockReturnValueOnce(new Promise((resolve) => resolve(true)));
    const accountData = new SignupDto({
      name: 'validname',
      email: 'validemail@mail.com',
      password: 'hashed_password',
      passwordConfirmation: 'hashed_password',
    });
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
    expect(promise).rejects.toThrow(new Error('Account already exist'));
  });

  it('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = new SignupDto({
      name: 'validname',
      email: 'validemail@mail.com',
      password: 'hashed_password',
      passwordConfirmation: 'hashed_password',
    });
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('hashed_password');
  });

  it('should throw an erro if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const accountData = new SignupDto({
      name: 'validname',
      email: 'validemail@mail.com',
      password: 'hashed_password',
      passwordConfirmation: 'hashed_password',
    });
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });

  it('should create an user account on success', async () => {
    const { sut } = makeSut();
    const accountData = new SignupDto({
      name: 'validname',
      email: 'validemail@mail.com',
      password: 'hashed_password',
      passwordConfirmation: 'hashed_password',
    });
    const response = await sut.add(accountData);
    expect(response).toEqual({
      id: expect.any(String),
      name: 'validname',
      email: 'validemail@mail.com',
      accountId: expect.any(String),
    });
  });

  it('should call CreateUserRepository with correct values', async () => {
    const { sut, createUserRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createUserRepositoryStub, 'create');
    const accountData = new SignupDto({
      name: 'validname',
      email: 'validemail@mail.com',
      password: 'hashed_password',
      passwordConfirmation: 'hashed_password',
    });
    await sut.add(accountData);
    expect(createSpy).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'validname',
      email: 'validemail@mail.com',
      password: 'hashed_password',
      accountId: expect.any(String),
      avatar: null,
      createdAt: expect.any(Date),
    });
  });

  it('should throw if CreateUserRepository throws', async () => {
    const { sut, createUserRepositoryStub } = makeSut();
    jest.spyOn(createUserRepositoryStub, 'create').mockImplementationOnce(
      () =>
        new Promise((resolve, reject) => {
          reject(new Error());
        }),
    );
    const accountData = new SignupDto({
      name: 'validname',
      email: 'validemail@mail.com',
      password: 'password',
      passwordConfirmation: 'password',
    });
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepository } = makeSut();
    const addSpy = jest.spyOn(addAccountRepository, 'add');
    const accountData = new SignupDto({
      name: 'validname',
      email: 'validemail@mail.com',
      password: 'password',
      passwordConfirmation: 'password',
    });
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      id: expect.any(String),
      userId: expect.any(String),
      status: 'active',
      plan: 'free',
      createdAt: expect.any(Date),
      updatedAt: null,
    });
  });
});
