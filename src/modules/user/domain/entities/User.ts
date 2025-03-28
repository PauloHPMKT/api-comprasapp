import Entity from '@/shared/seedworks/domain/entity/entity';
import { UniqueEntityId } from '@/shared/seedworks/domain/values-objects/unique-entity-id.vo';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  accountId?: string | null;
  createdAt?: Date;
};

export class User extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
    this.avatar = this.props.avatar;
    this.props.accountId = props.accountId ?? null;
    this.props.createdAt = props.createdAt ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get avatar(): string | null {
    return this.props.avatar;
  }

  get accountId(): string | null {
    return this.props.accountId;
  }

  private set avatar(avatar: string | null) {
    this.props.avatar = avatar ?? null;
  }

  assignAccountId(accountId: string) {
    this.props.accountId = accountId;
  }
}
