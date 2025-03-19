import { randomBytes } from 'crypto';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  accountId?: string;
  createdAt?: Date;
};

export class User {
  public readonly id: string;
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    this.id = id ?? randomBytes(12).toString('hex');
    this.props.avatar = props.avatar ?? null;
    this.props.createdAt = props.createdAt ?? new Date();
  }

  assignAccountId(accountId: string) {
    return (this.props.accountId = accountId);
  }
}
