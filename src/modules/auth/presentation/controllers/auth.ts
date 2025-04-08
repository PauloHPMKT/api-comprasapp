import { MissingParamError } from '@/shared/presentation/errors';
import {
  ok,
  badRequest,
  serverError,
  unauthorized,
} from '@/shared/presentation/helper/http-responses';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';
import { ValidateUserSignIn } from '../../domain/usecases/auth-signin';
import { AuthSignInModel } from '../../domain/models/auth-signin';

export class AuthController extends Controller {
  constructor(private readonly validateUser: ValidateUserSignIn) {
    super();
  }

  async handle(
    httpRequest: HttpRequest<AuthSignInModel.Params>,
  ): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      const requiredFields = ['email', 'password'];
      const error = this.validateRequiredFields(httpRequest, requiredFields);
      if (error) {
        return badRequest(new MissingParamError(error));
      }

      const signInData = await this.validateUser.validate({ email, password });

      if (!signInData) {
        return unauthorized(new Error('Invalid credentials'));
      }

      return ok(signInData);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
