import {
  HttpRequest,
  HttpResponse,
} from '@/modules/shared/presentation/protocols/http';
import { Controller } from '@/modules/shared/presentation/protocols/controller';
import { MissingParamsError } from '@/modules/shared/presentation/errors/missing-params-error';

export class SignupController extends Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
  }
}
