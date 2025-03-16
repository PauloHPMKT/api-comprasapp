import {
  HttpRequest,
  HttpResponse,
} from '@/modules/shared/presentation/protocols/http';

export class SignupController {
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
          body: new Error(`Missing params ${field}`),
        };
      }
    }
  }
}
