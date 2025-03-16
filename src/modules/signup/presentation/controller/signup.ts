interface HttpRequest {
  statusCode: number;
  body: any;
}

export class SignupController {
  async handle(httpRequest: any): Promise<HttpRequest> {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing params name'),
      };
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing params email'),
      };
    }
  }
}
