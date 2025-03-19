import { randomBytes } from 'crypto';
import { UniqueEntityId } from '../seedworks/domain/values-objects/unique-entity-id.vo';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  accountId?: string;
  createdAt?: Date;
};

export class User {
  public readonly id: UniqueEntityId;
  constructor(
    public readonly props: UserProps,
    id?: UniqueEntityId,
  ) {
    this.id = id || new UniqueEntityId();
    this.props.avatar = props.avatar ?? null;
    this.props.createdAt = props.createdAt ?? new Date();
  }

  assignAccountId(accountId: string) {
    return (this.props.accountId = accountId);
  }
}
