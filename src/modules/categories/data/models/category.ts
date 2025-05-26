import { Category } from '../../domain/entities/Category';

export namespace CategoryRepoModel {
  export type Params = ReturnType<Category['toJSON']>;

  export type Result = {
    id: string;
    name: string;
    icon: string | null;
    createdAt: Date;
  };
}
