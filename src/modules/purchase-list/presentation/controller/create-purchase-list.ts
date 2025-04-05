import { MissingParamError } from '@/shared/presentation/errors';

export class CreatePurchaseListController {
  async handle(httpRequest: any): Promise<any> {
    if (!httpRequest.body.title) {
      return {
        statusCode: 400,
        body: new MissingParamError('title'),
      };
    }
  }
}
