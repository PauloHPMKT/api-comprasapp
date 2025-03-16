import {
  HttpRequest,
  HttpResponse,
} from '@/modules/shared/presentation/protocols/http';
import { Controller } from '@/modules/shared/presentation/protocols/controller';
import { MissingParamsError } from '@/modules/shared/presentation/errors/missing-params-error';
import { EmailValidator } from '../protocols/email-validator';

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
        return {
          statusCode: 400,
          body: new MissingParamsError(field),
        };
      }
    }

    const isEmailValid = this.emailValidator.isValid(email);
    if (!isEmailValid) {
      return {
        statusCode: 400,
        body: new Error('Invalid param email'),
      };
    }
  }
}
