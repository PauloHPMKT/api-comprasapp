import {
  ok,
  badRequest,
  serverError,
  unauthorized,
} from '@/shared/presentation/helper/http-responses';
import { MissingParamError } from '@/shared/presentation/errors';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';
import { ValidateUserSignIn } from '../../domain/usecases/validate-user';
import { AuthSignInModel } from '../../domain/models/auth-signin';
import { SignIn } from '../../domain/usecases/signin';

export class AuthController extends Controller {
  constructor(
    private readonly validateUser: ValidateUserSignIn,
    private readonly signIn: SignIn,
  ) {
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

      const validUser = await this.validateUser.validate({ email, password });

      if (!validUser) {
        return unauthorized(new Error('Invalid credentials'));
      }

      const signInData = await this.signIn.login(validUser);

      return ok(signInData);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
