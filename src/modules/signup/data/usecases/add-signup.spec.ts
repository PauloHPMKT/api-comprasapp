import { Account } from '@/modules/account/domain/entities/Acount';
import { UserModel } from '@/modules/user/domain/models/user-model';
import { AddUserRepository } from '@/modules/user/data/protocols/add-user-repository';
import { AddAccountRepository } from '@/modules/account/data/protocols/add-account-repository';
import { Encrypter } from '../protocols/encrypter';
import { AddSignupUseCase } from './add-signup';
import { VerifyEmailRepository } from '../protocols/verify-email-repository';

const makeAddAccount = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(data: any): Promise<any> {
      return new Promise((resolve) => resolve({}));
    }
  }
  return new AddAccountRepositoryStub();
};

const makeAddUser = (): AddUserRepository => {
  class AddSignupRepositoryStub implements AddUserRepository {
    async create(data: UserModel.Params): Promise<UserModel.Params> {
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
  return new AddSignupRepositoryStub();
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'));
    }
  }
  return new EncrypterStub();
};

const makeVerifyEmail = (): VerifyEmailRepository => {
  class VerifyEmailRepositoryStub implements VerifyEmailRepository {
    async verify(email: string): Promise<boolean> {
      return new Promise((resolve) => resolve(false));
    }
  }
  return new VerifyEmailRepositoryStub();
};

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccount();
  const addUserRepositoryStub = makeAddUser();
  const verifyEmailRepositoryStub = makeVerifyEmail();
  const encrypterStub = makeEncrypter();
  const sut = new AddSignupUseCase(
    encrypterStub,
    verifyEmailRepositoryStub,
    addUserRepositoryStub,
    addAccountRepositoryStub,
  );
  return {
    sut,
    encrypterStub,
    verifyEmailRepositoryStub,
    addUserRepositoryStub,
    addAccountRepositoryStub,
  };
};

type SutTypes = {
  sut: AddSignupUseCase;
  encrypterStub: Encrypter;
  verifyEmailRepositoryStub: VerifyEmailRepository;
  addUserRepositoryStub: AddUserRepository;
  addAccountRepositoryStub: AddAccountRepository;
};

describe('AddSignupUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AddSignupUseCase);
    expect(sut).toBeTruthy();
  });

  it('should throw if the password and passwordConfirmation not match', async () => {
    const { sut } = makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anotherpassword',
    };
    const promise = sut.add(params);
    await expect(promise).rejects.toThrow(
      'Invalid param: passwordConfirmation',
    );
  });

  it('should thorw if VerifyEmailRepository returns true', async () => {
    const { sut, verifyEmailRepositoryStub } = makeSut();
    jest
      .spyOn(verifyEmailRepositoryStub, 'verify')
      .mockReturnValueOnce(new Promise((resolve) => resolve(true)));
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anypassword',
    };
    const promise = sut.add(params);
    await expect(promise).rejects.toThrow('Email already exists');
  });

  it('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anypassword',
    };
    await sut.add(params);
    expect(encryptSpy).toHaveBeenCalledWith('anypassword');
  });

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anypassword',
    };
    const promise = sut.add(params);
    await expect(promise).rejects.toThrow();
  });

  it('should create an account if all data is correct', async () => {
    const { sut } = makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anypassword',
    };

    const accountSpy = jest.spyOn(Account, 'create');
    await sut.add(params);
    expect(accountSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: expect.any(String),
      }),
    );
  });

  it('should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositoryStub } = makeSut();
    const createUserSpy = jest.spyOn(addUserRepositoryStub, 'create');
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anypassword',
    };
    await sut.add(params);
    expect(createUserSpy).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'hashed_password',
      avatar: null,
      accountId: expect.any(String),
      createdAt: expect.any(Date),
    });
  });

  it('should throw if AddUserRepository throws', async () => {
    const { sut, addUserRepositoryStub } = makeSut();
    jest
      .spyOn(addUserRepositoryStub, 'create')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anypassword',
    };
    const promise = sut.add(params);
    await expect(promise).rejects.toThrow();
  });

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addAccountSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anypassword',
    };
    await sut.add(params);
    expect(addAccountSpy).toHaveBeenCalledWith({
      id: expect.any(String),
      userId: expect.any(String),
      isActive: true,
      plan: 'free',
      createdAt: expect.any(Date),
    });
  });

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anypassword',
    };
    const promise = sut.add(params);
    await expect(promise).rejects.toThrow();
  });
});
