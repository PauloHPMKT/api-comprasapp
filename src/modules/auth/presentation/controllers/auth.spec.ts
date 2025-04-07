import { MissingParamError, ServerError } from '@/shared/presentation/errors';
import { AuthSignInModel } from '../../domain/models/auth-signin';
import { SignIn } from '../../domain/usecases/auth-signin';
import { AuthController } from './auth';

const makeAuthSignInUseCase = (): SignIn => {
  class AuthSignInStub implements SignIn {
    async signIn(
      data: AuthSignInModel.Params,
    ): Promise<AuthSignInModel.Result> {
      return new Promise((resolve) =>
        resolve({
          user: {
            id: 'any_id',
            name: 'any_name',
            email: 'any_email',
          },
          access_token: 'any_token',
        }),
      );
    }
  }
  return new AuthSignInStub();
};

const makeSut = (): SutTypes => {
  const authSignInStub = makeAuthSignInUseCase();
  const sut = new AuthController(authSignInStub);
  return {
    sut,
    authSignInStub,
  };
};

type SutTypes = {
  sut: AuthController;
  authSignInStub: SignIn;
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
    const { sut, authSignInStub } = makeSut();
    const signInSpy = jest.spyOn(authSignInStub, 'signIn');
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
    const { sut, authSignInStub } = makeSut();
    jest.spyOn(authSignInStub, 'signIn').mockImplementationOnce(() => {
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
});
