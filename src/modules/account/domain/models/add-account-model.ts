import { Account } from '../entities/Acount';

export namespace AddAccountModel {
  export type Params = ReturnType<Account['toJSON']>;
}
