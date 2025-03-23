import { User } from '../entities/User';

export namespace UserModel {
  export type Params = ReturnType<User['toJSON']>;
}
