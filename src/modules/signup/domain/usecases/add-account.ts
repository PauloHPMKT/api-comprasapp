export namespace AddAccountModel {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };

  export type Result = {
    id: string;
    name: string;
    email: string;
  };
}

export abstract class AddAccount {
  abstract add(
    accountData: AddAccountModel.Params,
  ): Promise<AddAccountModel.Result>;
}
