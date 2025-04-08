import { User } from '@/modules/user/domain/entities/User';

export namespace AuthSignInModel {
  export interface Params {
    email: string;
    password: string;
  }

  export type Result = Omit<ReturnType<User['toJSON']>, 'password'>;
}
