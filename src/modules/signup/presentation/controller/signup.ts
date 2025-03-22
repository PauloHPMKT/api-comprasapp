import { SignupModel } from '@/modules/signup/data/models/add-signup';
import { MissingParamError } from '@/shared/presentation/errors/missing-param-error';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';
import { AddSignup } from '../../domain/usecases/add-signup';
import {
  badRequest,
  created,
  serverError,
} from '@/shared/presentation/helper/http-responses';

export class SignupController extends Controller<SignupModel.Params> {
  constructor(private readonly addSignup: AddSignup) {
    super();
  }

  async handle(
    httpRequest: HttpRequest<SignupModel.Params>,
  ): Promise<HttpResponse> {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body;
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];
      const error = this.validateRequiredFields(httpRequest, requiredFields);
      if (error) {
        return badRequest(new MissingParamError(error));
      }

      const user = await this.addSignup.add({
        name,
        email,
        password,
        passwordConfirmation,
      });

      return created(user);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
