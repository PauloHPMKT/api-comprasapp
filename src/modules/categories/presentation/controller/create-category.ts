import { MissingParamError } from '@/shared/presentation/errors';
import { badRequest } from '@/shared/presentation/helper/http-responses';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';

interface CreateCategoryDTO {
  name: string;
  icon: string;
}

export class CreateCategoryController extends Controller {
  async handle(request: HttpRequest<CreateCategoryDTO>): Promise<HttpResponse> {
    if (!request.body.name) {
      return badRequest(new MissingParamError('name'));
    }
  }
}
