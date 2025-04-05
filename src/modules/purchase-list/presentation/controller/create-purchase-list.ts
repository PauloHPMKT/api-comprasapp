import { MissingParamError } from '@/shared/presentation/errors';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';
import { PurchaseListModel } from '../../domain/models/create-purchase-list';
import { badRequest } from '@/shared/presentation/helper/http-responses';
import { mockDecodeToken } from './create-purchase-list.spec';

export class CreatePurchaseListController extends Controller {
  constructor() {
    super();
  }

  async handle(
    httpRequest: HttpRequest<PurchaseListModel.Params>,
  ): Promise<HttpResponse> {
    const { title, description, products } = httpRequest.body;
    const authorization = httpRequest.headers?.authorization;
    const userId = mockDecodeToken(authorization);
    if (!userId) {
      return badRequest(new MissingParamError('userId'));
    }

    const requiredFields = ['title', 'products'];
    const error = this.validateRequiredFields(httpRequest, requiredFields);
    if (error) {
      return badRequest(new MissingParamError(error));
    }

    const deepRequiredFields = ['name', 'quantity'];
    const deepError = this.validateDeepRequiredFields(
      httpRequest,
      deepRequiredFields,
    );
    if (deepError) {
      return badRequest(new MissingParamError(deepError));
    }
  }
}
