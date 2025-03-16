interface HttpRequest {
  statusCode: number;
  body: any;
}

export class SignupController {
  async handle(httpRequest: any): Promise<HttpRequest> {
    const requiredFields = ['name', 'email', 'password'];
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
