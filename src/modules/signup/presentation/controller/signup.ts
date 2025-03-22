interface HttpRequest {
  body?: any;
  headers?: any;
  params?: any;
  query?: any;
  file?: any;
}

interface HttpResponse {
  statusCode: number;
  body: any;
}

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
          body: new Error(`Missing param ${field}`),
        };
      }
    }
  }
}
