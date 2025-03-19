export type UserProps = {
  name: string;
};

export class User {
  constructor(public readonly props: UserProps) {}
}
