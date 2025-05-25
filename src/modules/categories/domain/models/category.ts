import { Category } from '../entities/Category';

export namespace CategoryModel {
  export type Params = {
    name: string;
    icon: string;
  };

  export type Result = ReturnType<Category['toJSON']>;
}
