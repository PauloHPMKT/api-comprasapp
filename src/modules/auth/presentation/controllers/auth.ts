import { MissingParamError } from '@/shared/presentation/errors';
import { badRequest } from '@/shared/presentation/helper/http-responses';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpResponse } from '@/shared/presentation/types/http';

export class AuthController extends Controller {
  async handle(httpRequest: any): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'));
    }
  }
}
