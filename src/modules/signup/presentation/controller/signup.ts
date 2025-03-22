import { AccountModel } from '@/modules/signup/data/models/add-account';
import { MissingParamError } from '@/shared/presentation/errors/missing-param-error';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';

export class SignupController implements Controller<AccountModel.Params> {
  async handle(
    httpRequest: HttpRequest<AccountModel.Params>,
  ): Promise<HttpResponse> {
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
          body: new MissingParamError(field),
        };
      }
    }
  }
}
