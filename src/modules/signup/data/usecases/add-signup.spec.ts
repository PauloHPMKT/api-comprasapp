import { Account } from '@/modules/account/domain/entities/Acount';
import { Encrypter } from '../protocols/encrypter';
import { VerifyEmailRepository } from '../protocols/verify-email-repository';
import { AddSignupUseCase } from './add-signup';
import { AddUserRepository } from '@/modules/user/data/protocols/add-user-repository';
import { UserModel } from '@/modules/user/domain/models/user-model';

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
  const addUserRepositoryStub = makeAddUser();
  const verifyEmailRepositoryStub = makeVerifyEmail();
  const encrypterStub = makeEncrypter();
  const sut = new AddSignupUseCase(
    encrypterStub,
    verifyEmailRepositoryStub,
    addUserRepositoryStub,
  );
  return {
    sut,
    encrypterStub,
    verifyEmailRepositoryStub,
    addUserRepositoryStub,
  };
};

type SutTypes = {
  sut: AddSignupUseCase;
  encrypterStub: Encrypter;
  verifyEmailRepositoryStub: VerifyEmailRepository;
  addUserRepositoryStub: AddUserRepository;
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
});
