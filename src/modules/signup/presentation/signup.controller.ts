import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignupModel } from '../domain/models/signup';
import { AddSignup } from '../domain/usecases/add-signup';
import { MissingParamError } from '@/shared/errors/missing-param-error';
import { ControllerHandler } from '@/shared/presentation/protocols/controller';
import {
  badRequest,
  serverError,
} from '@/shared/presentation/helpers/http-helpers';
import {
  HttpRequest,
  HttpResponse,
} from '@/shared/presentation/protocols/http';

@Controller('signup')
export class SignupController extends ControllerHandler<SignupModel.Params> {
  constructor(
    @Inject('AddSignup')
    private readonly addSignup: AddSignup,
  ) {
    super();
  }

  @Post()
  async handle(
    @Body() request: HttpRequest<SignupModel.Params>,
  ): Promise<HttpResponse> {
    try {
      const hasError = this.validateRequiredFields(request);
      if (hasError) return badRequest(new MissingParamError(hasError));

      const { name, email, password, confirmPassword } = request.body;
      await this.addSignup.execute({
        name,
        email,
        password,
        confirmPassword,
      });

      return {
        statusCode: 201,
        body: {},
      };
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
