import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpResponse } from '@/shared/presentation/types/http';
import { GetCategories } from '../../domain/usecases/get-categories';

export class GetCategoriesController extends Controller {
  constructor(private readonly getCategories: GetCategories) {
    super();
  }

  async handle(): Promise<HttpResponse> {
    const categories = await this.getCategories.execute();
    return {
      statusCode: 200,
      body: categories,
    };
  }
}
