import bcrypt from 'bcryptjs';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcryptjs', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hash'));
  },
  async compare(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  },
}));

const salt = 12;

const makeSut = () => {
  return new BcryptAdapter(salt);
};

describe('Bcrypt', () => {
  it('should return a hash on hash method success', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  it('Should return a hash on success', async () => {
    const sut = makeSut();
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hash');
  });

  it('Should throw if bcrypt throws', async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.encrypt('any_value');
    await expect(promise).rejects.toThrow();
  });

  it('should return true on compare method success', async () => {
    const sut = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compareHash('any_value', 'hash');
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'hash');
  });

  it('should return false if compare method fails', async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementationOnce(() => Promise.resolve(false));
    const isValid = await sut.compareHash('any_value', 'hash');
    expect(isValid).toBe(false);
  });

  it('Should return true on success', async () => {
    const sut = makeSut();
    const isValid = await sut.compareHash('any_value', 'hash');
    expect(isValid).toBe(true);
  });
});
