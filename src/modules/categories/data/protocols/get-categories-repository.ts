export interface GetCategoriesRepository {
  findAll(): Promise<any[]>;
}
