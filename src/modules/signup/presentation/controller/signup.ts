export class SignupController {
  async handle(httpRequest: any) {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing params name'),
      };
    }
  }
}
