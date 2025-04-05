import { MissingParamError } from '@/shared/presentation/errors';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';
import { PurchaseListModel } from '../../domain/models/create-purchase-list';

export class CreatePurchaseListController extends Controller {
  constructor() {
    super();
  }

  async handle(
    httpRequest: HttpRequest<PurchaseListModel.Params>,
  ): Promise<HttpResponse> {
    const { title, description, products } = httpRequest.body;
    const requiredFields = ['title', 'products'];
    const error = this.validateRequiredFields(httpRequest, requiredFields);
    if (error) {
      return {
        statusCode: 400,
        body: new MissingParamError(error),
      };
    }

    const deepRequiredFields = ['name', 'quantity'];
    const deepError = this.validateDeepRequiredFields(
      httpRequest,
      deepRequiredFields,
    );
    if (deepError) {
      return {
        statusCode: 400,
        body: new MissingParamError(deepError),
      };
    }
  }
}
