import {
  HttpRequest,
  HttpResponse,
} from '@/modules/shared/presentation/protocols/http';
import { Controller } from '@/modules/shared/presentation/protocols/controller';
import { MissingParamsError } from '@/modules/shared/presentation/errors/missing-params-error';
import {
  badRequest,
  created,
  serverError,
} from '@/modules/shared/presentation/helpers/http-responses';
import { InvalidParamError } from '@/modules/shared/presentation/errors/invalid-param-error';
import { EmailValidator } from '../protocols/email-validator';
import { AddAccount } from '../../domain/usecases/add-account';

export class SignupController extends Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
  ) {
    super();
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      return created(account);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
