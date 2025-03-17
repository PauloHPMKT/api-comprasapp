interface UserProps {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export class User {
  constructor(public readonly props: UserProps) {
    this.props.avatar = props.avatar ?? null;
  }
}
