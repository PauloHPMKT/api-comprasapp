export namespace AuthSignInModel {
  export interface Params {
    email: string;
    password: string;
  }

  export type Result = {
    user: User;
    access_token: string;
  };

  interface User {
    id: string;
    name: string;
    email: string;
  }
}
