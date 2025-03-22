import { MissingParamError, ServerError } from '@/shared/presentation/errors';
import { SignupController } from './signup';
import { SignupModel } from '../../data/models/add-signup';
import { AddSignup } from '../../domain/usecases/add-signup';

const makeSignUp = (): AddSignup => {
  class AddSignupStub implements AddSignup {
    async add(params: SignupModel.Params): Promise<SignupModel.Result> {
      return new Promise((resolve) =>
        resolve({
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          avatar: 'null',
          accountId: 'any_account_id',
          createdAt: new Date('2025-12-10'),
        }),
      );
    }
  }
  return new AddSignupStub();
};

const makeSut = (): SutTypes => {
  const addSignupStub = makeSignUp();
  const sut = new SignupController(addSignupStub);
  return {
    sut,
    addSignupStub,
  };
};

type SutTypes = {
  sut: SignupController;
  addSignupStub: AddSignup;
};

describe('Signup Controller', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(SignupController);
    expect(sut).toBeTruthy();
  });

  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: undefined,
        email: 'antemail@mail.com',
        password: 'anypassword',
        passwordConfirmation: 'anypassword',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'anyname',
        email: undefined,
        password: 'anypassword',
        passwordConfirmation: 'anypassword',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'anyname',
        email: 'antemail@mail.com',
        password: undefined,
        passwordConfirmation: 'anypassword',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('should return 400 if no passwordConformation is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'anyname',
        email: 'antemail@mail.com',
        password: 'anypassword',
        passwordConfirmation: undefined,
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation'),
    );
  });

  it('should call AddSignup with correct values', async () => {
    const { sut, addSignupStub } = makeSut();
    const addSpy = jest.spyOn(addSignupStub, 'add');
    const httpRequest = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        passwordConfirmation: 'anypassword',
      },
    };
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      passwordConfirmation: 'anypassword',
    });
  });

  it('should return 500 if AddSignup throws', async () => {
    const { sut, addSignupStub } = makeSut();
    jest.spyOn(addSignupStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        passwordConfirmation: 'anypassword',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError('Internal server error'));
  });

  it('should return 201 if a user and an account is created on success', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        passwordConfirmation: 'anypassword',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      avatar: 'null',
      accountId: 'any_account_id',
      createdAt: new Date('2025-12-10'),
    });
  });
});
