import { Provider } from '@nestjs/common';
import { AddSignup } from '../usecases/add-signup';
import { SignupModel } from '../models/signup';

const fakeAddSignupUseCase: AddSignup = {
  execute: async (param: SignupModel.Params) => {
    console.log('Fake AddSignup UseCase executed with params:', param);
    return Promise.resolve({});
  },
};

export const makeUseCaseProviders: Provider[] = [
  {
    provide: 'AddSignup',
    useValue: fakeAddSignupUseCase,
  },
];
