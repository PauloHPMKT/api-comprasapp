import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpResponse } from '@/shared/presentation/types/http';
import { GetCategories } from '../../domain/usecases/get-categories';

export class GetCategoriesController extends Controller {
  constructor(private readonly getCategories: GetCategories) {
    super();
  }

  async handle(): Promise<HttpResponse> {
    await this.getCategories.execute();
    return {
      statusCode: 200,
      body: [
        {
          id: '1',
          name: 'Category 1',
          icon: '🚿',
          createdAt: new Date('2023-01-01T00:00:00Z'),
        },
        {
          id: '2',
          name: 'Category 2',
          icon: '🥦',
          createdAt: new Date('2023-02-01T00:00:00Z'),
        },
        {
          id: '3',
          name: 'Category 3',
          icon: '🍎',
          createdAt: new Date('2023-03-01T00:00:00Z'),
        },
      ],
    };
  }
}
