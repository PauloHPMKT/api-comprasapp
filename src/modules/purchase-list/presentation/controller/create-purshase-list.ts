interface HttpRequest {
  body?: any;
  headers?: any;
  params?: any;
  query?: any;
  file?: any;
}

export class CreatePurchaseListController {
  async handle(httpRequest: HttpRequest): Promise<any> {
    if (!httpRequest.body.listName) {
      return {
        statusCode: 400,
        body: new Error('Missing param: listName'),
      };
    }
  }
}
