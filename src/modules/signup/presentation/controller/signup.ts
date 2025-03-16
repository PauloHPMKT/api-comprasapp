import {
  HttpRequest,
  HttpResponse,
} from '@/modules/shared/presentation/protocols/http';
import { Controller } from '@/modules/shared/presentation/protocols/controller';
import { MissingParamsError } from '@/modules/shared/presentation/errors/missing-params-error';
import { badRequest } from '@/modules/shared/presentation/helpers/http-responses';
import { EmailValidator } from '../protocols/email-validator';
import { InvalidParamError } from '@/modules/shared/presentation/errors/invalid-param-error';

export class SignupController extends Controller {
  constructor(private readonly emailValidator: EmailValidator) {
    super();
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password, passwordConfirmation } = httpRequest.body;
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
    ];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field));
      }
    }

    if (password !== passwordConfirmation) {
      return badRequest(new InvalidParamError('passwordConfirmation'));
    }

    const isEmailValid = this.emailValidator.isValid(email);
    if (!isEmailValid) {
      return badRequest(new InvalidParamError('email'));
    }
  }
}
