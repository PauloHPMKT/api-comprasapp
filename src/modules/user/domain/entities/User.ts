interface UserProps {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: Date;
}

export class User {
  constructor(public readonly props: UserProps) {
    this.props.avatar = props.avatar ?? null;
    this.props.createdAt = props.createdAt ?? new Date();
  }
}
