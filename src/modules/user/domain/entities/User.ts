import { randomBytes } from 'crypto';

interface UserProps {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: Date;
}

export class User {
  public readonly id: string;
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    this.id = id || randomBytes(12).toString('hex');
    this.props.avatar = props.avatar ?? null;
    this.props.createdAt = props.createdAt ?? new Date();
  }
}
