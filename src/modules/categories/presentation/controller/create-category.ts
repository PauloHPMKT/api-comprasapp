import { MissingParamError } from '@/shared/presentation/errors';
import {
  badRequest,
  serverError,
} from '@/shared/presentation/helper/http-responses';
import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';
import { CategoryModel } from '../../domain/models/category';
import { CreateCategory } from '../../domain/usecases/create-category';

export class CreateCategoryController extends Controller<CategoryModel.Params> {
  constructor(private readonly createCategory: CreateCategory) {
    super();
  }

  async handle(
    request: HttpRequest<CategoryModel.Params>,
  ): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'icon'];
      const error = this.validateRequiredFields(request, requiredFields);
      if (error) {
        return badRequest(new MissingParamError(error));
      }

      const { name, icon } = request.body;
      await this.createCategory.execute({
        name,
        icon,
      });
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
