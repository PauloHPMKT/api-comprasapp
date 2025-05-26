import { MissingParamError } from '@/shared/presentation/errors';
import { badRequest } from '@/shared/presentation/helper/http-responses';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';

interface CreateCategoryDTO {
  name: string;
  icon: string;
}

export class CreateCategoryController extends Controller<CreateCategoryDTO> {
  constructor() {
    super();
  }

  async handle(request: HttpRequest<CreateCategoryDTO>): Promise<HttpResponse> {
    const requiredFields = ['name', 'icon'];
    const error = this.validateRequiredFields(request, requiredFields);
    if (error) {
      return badRequest(new MissingParamError(error));
    }
  }
}
