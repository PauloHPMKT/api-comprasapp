import {
  InvalidParamError,
  MissingParamsError,
} from '@/modules/shared/presentation/errors';
import {
  HttpRequest,
  HttpResponse,
} from '@/modules/shared/presentation/protocols/http';
import {
  badRequest,
  created,
  serverError,
} from '@/modules/shared/presentation/helpers/http-responses';
import { Controller } from '@/modules/shared/presentation/protocols/controller';
import { EmailValidator } from '../protocols/email-validator';
import { AddAccount } from '../../domain/usecases/add-account';
import { SignupDto } from '../../data/dto/signup-dto';

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

      const hasError = this.validateRequiredFields(httpRequest, requiredFields);
      if (hasError) {
        return badRequest(new MissingParamsError(hasError));
      }

      const signupDto = new SignupDto({
        name,
        email,
        password,
        passwordConfirmation,
      });

      const isEmailValid = this.emailValidator.isValid(email);
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = await this.addAccount.add(signupDto);
      return created(account);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
