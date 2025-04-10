import jwt from 'jsonwebtoken';
import {
  badRequest,
  created,
  serverError,
} from '@/shared/presentation/helper/http-responses';
import { MissingParamError } from '@/shared/presentation/errors';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';
import { PurchaseListModel } from '../../domain/models/create-purchase-list';
import { AddPurchaseList } from '../../domain/usecases/add-purchase-list';

const decoreToken = (token: string): any => {
  console.log(token);
  try {
    const decodedToken = jwt.verify(token, '123456789') as { sub: string };
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export class CreatePurchaseListController extends Controller<PurchaseListModel.Params> {
  constructor(private readonly addPurchaseList: AddPurchaseList) {
    super();
  }

  async handle(
    httpRequest: HttpRequest<PurchaseListModel.Params>,
  ): Promise<HttpResponse> {
    try {
      const { title, description = null, products } = httpRequest.body;
      const { authorization } = httpRequest.headers;
      const token = authorization.split(' ')[1];
      const userId = decoreToken(token).sub;

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

      const purchaseList = await this.addPurchaseList.add({
        title,
        description,
        products,
        userId,
      });

      return created(purchaseList);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
