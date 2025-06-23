import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupController } from 'src/modules/signup/presentation/signup.controller';

@Module({
  imports: [],
  controllers: [AppController, SignupController],
  providers: [AppService],
})
export class AppModule {}
