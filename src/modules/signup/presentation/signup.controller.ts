import { Body, Controller, Post } from '@nestjs/common';
import { SignupModel } from '../domain/models/signup';
import { badRequest } from '@/shared/presentation/helpers/http-helpers';
import { MissingParamError } from '@/shared/errors/missing-param-error';
import { ControllerHandler } from '@/shared/presentation/protocols/controller';
import {
  HttpRequest,
  HttpResponse,
} from '@/shared/presentation/protocols/http';

@Controller('signup')
export class SignupController extends ControllerHandler<SignupModel.Params> {
  @Post()
  async handle(
    @Body() request: HttpRequest<SignupModel.Params>,
  ): Promise<HttpResponse> {
    const hasError = this.validateRequiredFields(request);
    if (hasError) {
      return badRequest(new MissingParamError(hasError));
    }

    return {
      statusCode: 200,
      body: {},
    };
  }
}
