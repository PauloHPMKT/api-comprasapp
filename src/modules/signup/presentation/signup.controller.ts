import { Body, Controller, Post } from '@nestjs/common';
import { badRequest } from './helpers/http-helpers';
import { MissingParamError } from '@/shared/errors/missing-param-error';

@Controller('signup')
export class SignupController {
  @Post()
  async handle(@Body() params: any): Promise<any> {
    if (!params.body.name) {
      return badRequest(new MissingParamError('name'));
    }

    if (!params.body.email) {
      return badRequest(new MissingParamError('email'));
    }

    if (!params.body.password) {
      return badRequest(new MissingParamError('password'));
    }
  }
}
