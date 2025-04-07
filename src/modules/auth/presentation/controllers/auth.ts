import { MissingParamError } from '@/shared/presentation/errors';
import {
  badRequest,
  serverError,
} from '@/shared/presentation/helper/http-responses';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';
import { SignIn } from '../../domain/usecases/auth-signin';
import { AuthSignInModel } from '../../domain/models/auth-signin';

export class AuthController extends Controller {
  constructor(private readonly authSignIn: SignIn) {
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

      await this.authSignIn.signIn({ email, password });
    } catch (error) {
      return serverError();
    }
  }
}
