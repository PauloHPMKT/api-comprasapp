import { MissingParamError } from '@/shared/presentation/errors';
import { badRequest } from '@/shared/presentation/helper/http-responses';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpResponse } from '@/shared/presentation/types/http';

export class AuthController extends Controller {
  constructor() {
    super();
  }

  async handle(httpRequest: any): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;

    const requiredFields = ['email', 'password'];
    const error = this.validateRequiredFields(httpRequest, requiredFields);
    if (error) {
      return badRequest(new MissingParamError(error));
    }
  }
}
