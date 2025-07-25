import { Controller, Inject, Post, Req } from '@nestjs/common';
import { SignupModel } from '../../domain/models/signup';
import { AddAccount } from '../../domain/usecases/add-account';
import { BaseController } from '@/shared/presentation/protocols/Controller';
import {
  badRequest,
  conflict,
  created,
  serverError,
} from '@/shared/presentation/helpers/http-response';
import { HttpRequest, HttpResponse } from '@/shared/presentation/http';
import { MissingParamError, UserAlreadyExistsError } from '@/shared/errors';

@Controller('signup')
export class SignupController extends BaseController<SignupModel.Params> {
  constructor(
    @Inject('AddAccount')
    private readonly addAccount: AddAccount,
  ) {
    super();
  }

  @Post()
  async handle(
    @Req() request: HttpRequest<SignupModel.Params>,
  ): Promise<HttpResponse<string | Error>> {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'confirmationPassword',
      ];
      for (const field of requiredFields) {
        if (!request.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, email, password, confirmationPassword } = request.body;

      const useremail = await this.addAccount.execute({
        name,
        email,
        password,
        confirmationPassword,
      });

      return created(useremail);
    } catch (error) {
      console.error(error);
      if (error instanceof UserAlreadyExistsError) {
        return conflict(error);
      }
      return serverError();
    }
  }
}
