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
});
