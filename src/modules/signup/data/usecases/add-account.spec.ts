import { InvalidParamError } from '@/modules/shared/presentation/errors';
import { AddAccountUseCase } from './add-account';
import { SignupDto } from '../dto/signup-dto';
import { Encrypter } from '../protocols/encypter';
import { VerifyUserRepository } from '../protocols/verify-user-repository';
import { CreateUserRepository } from '../protocols/create-user-repository';

const makeCreateUserRepository = (): CreateUserRepository => {
  class CreateUserRepositoryStub implements CreateUserRepository {
    async create(data: any): Promise<any> {
      return new Promise((resolve) =>
        resolve({
          id: 'valid_id',
          name: 'validname',
          email: 'validemail@mail.com',
          avatar: null,
          createdAt: new Date('2025-12-25'),
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
  const createUserRepositoryStub = makeCreateUserRepository();
  const verifyUserExistStub = makeVerifyAccountRepository();
  const encrypterStub = makeEncrypter();
  const sut = new AddAccountUseCase(
    encrypterStub,
    verifyUserExistStub,
    createUserRepositoryStub,
  );
  return {
    sut,
    encrypterStub,
    verifyUserExistStub,
    createUserRepositoryStub,
  };
};

interface SutTypes {
  sut: AddAccountUseCase;
  encrypterStub: Encrypter;
  verifyUserExistStub: VerifyUserRepository;
  createUserRepositoryStub: CreateUserRepository;
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
      name: 'valid_name',
      email: 'valid_email',
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
      name: 'valid_name',
      email: 'valid_email',
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
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      passwordConfirmation: 'hashed_password',
    });
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });

  it('should create an User instance on success', async () => {
    const { sut } = makeSut();
    const accountData = new SignupDto({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      passwordConfirmation: 'hashed_password',
    });
    const response = await sut.add(accountData);
    expect(response).toEqual({
      id: 'valid_id',
      name: 'validname',
      email: 'validemail@mail.com',
    });
  });

  it('should call CreateUserRepository with correct values', async () => {
    const { sut, createUserRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createUserRepositoryStub, 'create');
    const accountData = new SignupDto({
      name: 'valid_name',
      email: 'validemail@mail.com',
      password: 'hashed_password',
      passwordConfirmation: 'hashed_password',
    });
    await sut.add(accountData);
    expect(createSpy).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'valid_name',
      email: 'validemail@mail.com',
      password: 'hashed_password',
      avatar: null,
      createdAt: expect.any(Date),
    });
  });
});
