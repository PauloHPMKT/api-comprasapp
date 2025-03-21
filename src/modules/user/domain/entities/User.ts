import Entity from '../../../../shared/seedworks/domain/entity/entity';
import { UniqueEntityId } from '../../../../shared/seedworks/domain/values-objects/unique-entity-id.vo';

export type UserProps = {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  accountId?: string;
  createdAt?: Date;
};

export class User extends Entity<UserProps> {
  private constructor(
    public readonly props: UserProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
    this.avatar = this.props.avatar;
    this.props.createdAt = props.createdAt ?? new Date();
  }

  static create(props: UserProps, id?: UniqueEntityId): User {
    return new User(props, id);
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

  private set avatar(avatar: string | null) {
    this.props.avatar = avatar ?? null;
  }

  assignAccountId(accountId: string) {
    return (this.props.accountId = accountId);
  }
}
