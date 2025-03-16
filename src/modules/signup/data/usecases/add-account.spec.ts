import { InvalidParamError } from '@/modules/shared/presentation/errors';
import { AddAccountUseCase } from './add-account';
import { SignupDto } from '../dto/signup-dto';
import { Encrypter } from '../protocols/encypter';

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return 'hashed_password';
    }
  }
  return new EncrypterStub();
};

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new AddAccountUseCase(encrypterStub);
  return {
    sut,
    encrypterStub,
  };
};

interface SutTypes {
  sut: AddAccountUseCase;
  encrypterStub: Encrypter;
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
});
