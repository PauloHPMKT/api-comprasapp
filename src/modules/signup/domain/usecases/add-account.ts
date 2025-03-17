import { SignupDto } from '../../data/dto/signup-dto';

export namespace AddAccountModel {
  export type Result = {
    id: string;
    name: string;
    email: string;
    accountId: string;
  };
}

export abstract class AddAccount {
  abstract add(accountData: SignupDto): Promise<AddAccountModel.Result | Error>;
}
