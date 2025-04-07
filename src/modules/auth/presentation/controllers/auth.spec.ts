import { MissingParamError } from '@/shared/presentation/errors';
import { AuthController } from './auth';

const makeSut = (): SutTypes => {
  const sut = new AuthController();
  return {
    sut,
  };
};

type SutTypes = {
  sut: AuthController;
};

describe('AuthController', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(AuthController);
    expect(sut).toBeTruthy();
  });

  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('email'));
  });
});
