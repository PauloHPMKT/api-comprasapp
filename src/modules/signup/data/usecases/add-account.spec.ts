import { InvalidParamError } from '@/modules/shared/presentation/errors';
import { AddAccountUseCase } from './add-account';
import { SignupDto } from '../dto/signup-dto';

const makeSut = (): AddAccountUseCase => {
  return new AddAccountUseCase();
};

describe('AddAccount', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return an error if password not match', async () => {
    const sut = makeSut();
    const accountData = new SignupDto({
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'invalidpassword',
    });
    const response = await sut.add(accountData);
    expect(response).toEqual(new InvalidParamError('passwordConfirmation'));
  });
});
