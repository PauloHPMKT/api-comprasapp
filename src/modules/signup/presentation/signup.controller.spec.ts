import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';
import { MissingParamError } from '@/shared/errors/missing-param-error';
import { AddSignup } from '../domain/usecases/add-signup';
import { ServerError } from '@/shared/errors/server-error';

const makeAddSignupStub = (): AddSignup => ({
  execute: jest.fn().mockResolvedValue({}),
});

const makeSut = async () => {
  const addSignupStub = makeAddSignupStub();

  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [SignupController],
    providers: [
      {
        provide: 'AddSignup',
        useValue: addSignupStub,
      },
    ],
  }).compile();
  const sut = moduleRef.get<SignupController>(SignupController);
  return { sut, addSignupStub };
};

describe('SignupController', () => {
  it('should be defined', async () => {
    const { sut } = await makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(SignupController);
    expect(sut).toBeTruthy();
  });

  it('should return 400 if no name is provided', async () => {
    const { sut } = await makeSut();
    const params = {
      body: {
        name: '',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        confirmPassword: 'anypassword',
      },
    };
    const response = await sut.handle(params);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('name').message);
  });

  it('should return 400 if no email is provided', async () => {
    const { sut } = await makeSut();
    const params = {
      body: {
        name: 'anyname',
        email: '',
        password: 'anypassword',
        confirmPassword: 'anypassword',
      },
    };
    const response = await sut.handle(params);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('email').message);
  });

  it('should return 400 if no password is provided', async () => {
    const { sut } = await makeSut();
    const params = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: '',
        confirmPassword: 'anypassword',
      },
    };
    const response = await sut.handle(params);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('password').message);
  });

  it('should return 400 if no confirmPassword is provided', async () => {
    const { sut } = await makeSut();
    const params = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        confirmPassword: '',
      },
    };
    const response = await sut.handle(params);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(
      new MissingParamError('confirmPassword').message,
    );
  });

  it('should return 201 if all required fields are provided', async () => {
    const { sut } = await makeSut();
    const params = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        confirmPassword: 'anypassword',
      },
    };
    const response = await sut.handle(params);
    expect(response.statusCode).toBe(201);
  });

  it('should call AddSignup with correct values', async () => {
    const { sut, addSignupStub } = await makeSut();
    const params = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        confirmPassword: 'anypassword',
      },
    };
    const executeSpy = jest.spyOn(addSignupStub, 'execute');
    await sut.handle(params);
    expect(executeSpy).toHaveBeenCalledWith({
      name: 'anyname',
      email: 'anyemail@mail.com',
      password: 'anypassword',
      confirmPassword: 'anypassword',
    });
  });

  it('should return 500 if AddSignup throws an error', async () => {
    const { sut, addSignupStub } = await makeSut();
    jest.spyOn(addSignupStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const params = {
      body: {
        name: 'anyname',
        email: 'anyemail@mail.com',
        password: 'anypassword',
        confirmPassword: 'anypassword',
      },
    };
    const response = await sut.handle(params);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError().message);
  });
});
