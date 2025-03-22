import Entity from '@/shared/seedworks/domain/entity/entity';
import { UniqueEntityId } from '@/shared/seedworks/domain/values-objects/unique-entity-id.vo';

export type AccountProps = {
  userId: string;
  isActive?: boolean;
  plan?: Account.Plan;
  createdAt?: Date;
};

export namespace Account {
  export type Plan = 'free' | 'premium';
}

export class Account extends Entity<AccountProps> {
  constructor(
    public readonly props: AccountProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
    this.props.isActive = props.isActive ?? true;
    this.props.plan = props.plan ?? 'free';
    this.props.createdAt = props.createdAt ?? new Date();
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get plan(): Account.Plan {
    return this.props.plan;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
