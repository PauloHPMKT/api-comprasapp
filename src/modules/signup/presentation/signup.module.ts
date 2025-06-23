import { Module, Provider } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { makeUseCaseProviders } from '../domain/providers/add-signup-usecases';

const providers: Provider[] = [...makeUseCaseProviders];

@Module({
  imports: [],
  controllers: [SignupController],
  providers,
  exports: [],
})
export class SignupModule {}
