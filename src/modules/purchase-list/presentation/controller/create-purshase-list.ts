import { Controller } from '../../../shared/presentation/protocol/controller';
import { HttpRequest } from '../../../shared/presentation/protocol/http';

export class CreatePurchaseListController implements Controller {
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
          const requiredItemFields = ['product_id', 'quantity'];
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
