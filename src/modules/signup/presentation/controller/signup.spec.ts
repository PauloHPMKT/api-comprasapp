import { MissingParamsError } from '@/modules/shared/presentation/errors/missing-params-error';
import { SignupController } from './signup';

const makeSut = () => {
  return new SignupController();
};

describe('SignupController', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return 400 if no name is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: 'anyemail@mail.com',
        password: 'anypassword',
        passwordConfirmation: 'anypassword',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamsError('name'));
  });

  it('should return 400 if no email is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyname',
        password: 'anypassword',
        passwordConfirmation: 'anypassword',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamsError('email'));
  });

  it('should return 400 if no password is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        passwordConfirmation: 'anypassword',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamsError('password'));
  });

  it('should return 400 if no passwordConfirmation is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamsError('passwordConfirmation'),
    );
  });
});
