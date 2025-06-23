import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';

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

  it('should return 404 if no name is provided', async () => {
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
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(new Error('Name is required'));
  });

  it('should return 404 if no email is provided', async () => {
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
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(new Error('Email is required'));
  });
});
