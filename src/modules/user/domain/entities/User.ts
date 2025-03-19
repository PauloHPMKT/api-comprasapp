export type UserProps = {
  name: string;
  email: string;
};

export class User {
  constructor(public readonly props: UserProps) {}
}
