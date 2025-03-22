interface HttpResponse {
  statusCode: number;
  body: any;
}

export class SignupController {
  async handle(httpRequest: any): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param name'),
      };
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param email'),
      };
    }

    if (!httpRequest.body.password) {
      return {
        statusCode: 400,
        body: new Error('Missing param password'),
      };
    }

    if (!httpRequest.body.passwordConfirmation) {
      return {
        statusCode: 400,
        body: new Error('Missing param passwordConfirmation'),
      };
    }
  }
}
