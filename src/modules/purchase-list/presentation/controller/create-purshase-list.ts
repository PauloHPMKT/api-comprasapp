interface HttpRequest {
  body?: any;
  headers?: any;
  params?: any;
  query?: any;
  file?: any;
}

export class CreatePurchaseListController {
  async handle(httpRequest: HttpRequest): Promise<any> {
    const requiredFields = ['listName', 'items'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${field}`),
        };
      }

      if (field === 'items') {
        const items = httpRequest.body.items;
        for (const item of items) {
          const requiredItemFields = ['quantity'];
          for (const itemField of requiredItemFields) {
            if (!item[itemField]) {
              return {
                statusCode: 400,
                body: new Error(`Missing param: ${itemField}`),
              };
            }
          }
        }
      }
    }
  }
}
