import { AddSignupUseCase } from './add-signup';

const makeSut = (): AddSignupUseCase => {
  return new AddSignupUseCase();
};

describe('AddSignupUseCase', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AddSignupUseCase);
    expect(sut).toBeTruthy();
  });

  it('should throw if the password and passwordConfirmation not match', async () => {
    const sut = makeSut();
    const params = {
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anotherpassword',
    };
    const promise = sut.add(params);
    await expect(promise).rejects.toThrow(
      'Invalid Param: passwordConfirmation',
    );
  });
});
