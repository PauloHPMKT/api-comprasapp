import { Controller } from '@/shared/presentation/protocols/controller';
import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';

export class GetCategoriesController extends Controller {
  async handle(): Promise<HttpResponse> {
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
