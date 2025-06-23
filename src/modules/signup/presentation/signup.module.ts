import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';

@Module({
  imports: [],
  controllers: [SignupController],
  providers: [],
  exports: [],
})
export class SignupModule {}
