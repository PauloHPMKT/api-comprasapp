import { Encrypter } from '../protocols/encrypter';
import { VerifyEmailRepository } from '../protocols/verify-email-repository';
import { AddSignupUseCase } from './add-signup';

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
  const verifyEmailRepositoryStub = makeVerifyEmail();
  const encrypterStub = makeEncrypter();
  const sut = new AddSignupUseCase(encrypterStub, verifyEmailRepositoryStub);
  return {
    sut,
    encrypterStub,
    verifyEmailRepositoryStub,
  };
};

type SutTypes = {
  sut: AddSignupUseCase;
  encrypterStub: Encrypter;
  verifyEmailRepositoryStub: VerifyEmailRepository;
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
});
