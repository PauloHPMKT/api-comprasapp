export class CreatePurchaseListController {
  async handle(httpRequest: any): Promise<any> {
    if (!httpRequest.body.title) {
      return {
        statusCode: 400,
        body: new Error('Title is required'),
      };
    }
  }
}
