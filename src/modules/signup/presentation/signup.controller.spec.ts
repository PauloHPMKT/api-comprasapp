import { Test, TestingModule } from '@nestjs/testing';
import { SignupController } from './signup.controller';

describe('SignupController', () => {
  let signupController: SignupController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SignupController],
      providers: [],
    }).compile();

    signupController = app.get<SignupController>(SignupController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(signupController).toBeDefined();
    });
  });
});
