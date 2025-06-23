import { Body, Controller, Post } from '@nestjs/common';
import { badRequest } from '../../../shared/presentation/helpers/http-helpers';
import { MissingParamError } from '@/shared/errors/missing-param-error';
import { HttpRequest } from '@/shared/presentation/protocols/http';
import { SignupModel } from '../domain/models/signup';

@Controller('signup')
export class SignupController {
  @Post()
  async handle(@Body() request: HttpRequest<SignupModel.Params>): Promise<any> {
    const requiredFields = ['name', 'email', 'password', 'confirmPassword'];
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
