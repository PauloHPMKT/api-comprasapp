import { AccountModel } from '@/shared/data/models/add-account';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';

export class SignupController {
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
          body: new Error(`Missing param ${field}`),
        };
      }
    }
  }
}
