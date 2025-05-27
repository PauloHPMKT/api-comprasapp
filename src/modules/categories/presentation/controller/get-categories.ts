import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpResponse } from '@/shared/presentation/types/http';
import { GetCategories } from '../../domain/usecases/get-categories';
import { ok, serverError } from '@/shared/presentation/helper/http-responses';

export class GetCategoriesController extends Controller {
  constructor(private readonly getCategories: GetCategories) {
    super();
  }

  async handle(): Promise<HttpResponse> {
    try {
      const categories = await this.getCategories.execute();
      return ok(categories);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
