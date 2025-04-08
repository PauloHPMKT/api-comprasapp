import { MissingParamError, ServerError } from '@/shared/presentation/errors';
import { AuthSignInModel } from '../../domain/models/auth-signin';
import { ValidateUserSignIn } from '../../domain/usecases/auth-signin';
import { AuthController } from './auth';

const makeValidateUser = (): ValidateUserSignIn => {
  class ValidateUser implements ValidateUserSignIn {
    async validate(
      data: AuthSignInModel.Params,
    ): Promise<AuthSignInModel.Result | null> {
      if (
        data.email === 'invalid_email' ||
        data.password === 'invalid_password'
      ) {
        return null;
      }

      return new Promise((resolve) =>
        resolve({
          id: 'valid_id',
          name: 'valid_username',
          email: 'valid_email@mail.com',
          avatar: null,
          accountId: 'valid_account_id',
          createdAt: new Date('2025-01-01'),
        }),
      );
    }
  }
  return new ValidateUser();
};

const makeSut = (): SutTypes => {
  const validateUserStub = makeValidateUser();
  const sut = new AuthController(validateUserStub);
  return {
    sut,
    validateUserStub: validateUserStub,
  };
};

type SutTypes = {
  sut: AuthController;
  validateUserStub: ValidateUserSignIn;
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
    const response = await sut.handle(httpRequest as any);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('email'));
  });

  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email',
      },
    };
    const response = await sut.handle(httpRequest as any);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('password'));
  });

  it('should call AuthSignIn with correct values', async () => {
    const { sut, validateUserStub } = makeSut();
    const signInSpy = jest.spyOn(validateUserStub, 'validate');
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
      },
    };
    await sut.handle(httpRequest);
    expect(signInSpy).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password',
    });
  });

  it('should return 500 if AuthSignIn throws', async () => {
    const { sut, validateUserStub } = makeSut();
    jest.spyOn(validateUserStub, 'validate').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError());
  });

  it('should return 401 if invalid credentials are provided', async () => {
    const { sut, validateUserStub } = makeSut();
    jest.spyOn(validateUserStub, 'validate').mockResolvedValueOnce(null);
    const httpRequest = {
      body: {
        email: 'invalid_email',
        password: 'invalid_password',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual(new Error('Invalid credentials'));
  });

  it('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
      },
    };
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: 'valid_id',
      name: 'valid_username',
      email: 'valid_email@mail.com',
      avatar: null,
      accountId: 'valid_account_id',
      createdAt: new Date('2025-01-01'),
    });
  });
});
