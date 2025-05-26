export namespace SignupModel {
  export interface Params {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }

  export type Result = {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string | null;
    accountId: string;
    createdAt: Date;
  };
}
