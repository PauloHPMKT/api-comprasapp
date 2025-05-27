import { GetCategories } from '../../domain/usecases/get-categories';
import { GetCategoriesRepository } from '../protocols/get-categories-repository';

export class GetCategoriesUseCase implements GetCategories {
  constructor(
    private readonly getCategoriesRepository: GetCategoriesRepository,
  ) {}

  async execute(): Promise<any> {
    await this.getCategoriesRepository.findAll();
  }
}
