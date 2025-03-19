export type UserProps = {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
};

export class User {
  constructor(public readonly props: UserProps) {
    this.props.avatar = props.avatar ?? null;
  }
}
