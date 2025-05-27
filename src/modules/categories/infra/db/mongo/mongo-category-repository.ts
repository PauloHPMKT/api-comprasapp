import { CategoryRepoModel } from '@/modules/categories/data/models/category';
import { CreateCategoryRepository } from '@/modules/categories/data/protocols/create-category-repository';
import { GetCategoriesRepository } from '@/modules/categories/data/protocols/get-categories-repository';
import { VerifyCategoryRepository } from '@/modules/categories/data/protocols/verify-category-repository';
import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';

export class MongoCategoryRepository
  implements
    CreateCategoryRepository,
    VerifyCategoryRepository,
    GetCategoriesRepository
{
  async create(
    params: CategoryRepoModel.Params,
  ): Promise<CategoryRepoModel.Result> {
    const categoryCollection = MongoHelper.getCollection('categories');
    const { insertedId } = await categoryCollection.insertOne({
      _id: MongoHelper.toObjectId(params.id),
      name: params.name,
      icon: params.icon,
      createdAt: params.createdAt,
    });
    const category = await categoryCollection.findOne({
      _id: insertedId,
    });
    return MongoHelper.map(category) as CategoryRepoModel.Result;
  }

  async verify(categoryName: string): Promise<boolean> {
    const categoryCollection = MongoHelper.getCollection('categories');
    const category = await categoryCollection.findOne({
      name: categoryName,
    });
    return !!category;
  }

  async findAll(): Promise<any[]> {
    const categoryCollection = MongoHelper.getCollection('categories');
    const categories = await categoryCollection.find().toArray();
    return categories;
  }
}
