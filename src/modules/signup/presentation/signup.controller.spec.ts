import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';
import { MissingParamError } from '@/shared/errors/missing-param-error';

const makeSut = async () => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [SignupController],
    providers: [],
  }).compile();
  const sut = moduleRef.get<SignupController>(SignupController);
  return { sut, moduleRef };
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
    expect(response.message).toEqual(new MissingParamError('name').message);
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
    expect(response.message).toEqual(new MissingParamError('email').message);
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
    expect(response.message).toEqual(new MissingParamError('password').message);
  });
});
