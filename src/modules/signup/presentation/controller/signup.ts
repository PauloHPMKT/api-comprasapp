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
  }
}
