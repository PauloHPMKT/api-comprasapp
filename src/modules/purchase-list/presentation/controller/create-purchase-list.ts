import { MissingParamError } from '@/shared/presentation/errors';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';

interface CreateListDto {
  title: string;
  description: string | null;
  products: Products[];
}

interface Products {
  name: string;
  quantity: number;
  unitPrice?: number | null;
  totalPrice?: number | null;
}

export class CreatePurchaseListController extends Controller {
  async handle(httpRequest: HttpRequest<CreateListDto>): Promise<HttpResponse> {
    if (!httpRequest.body.title) {
      return {
        statusCode: 400,
        body: new MissingParamError('title'),
      };
    }

    if (!httpRequest.body.products) {
      return {
        statusCode: 400,
        body: new MissingParamError('products'),
      };
    }
  }
}
