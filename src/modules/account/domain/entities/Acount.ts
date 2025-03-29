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
    this.isActive = props.isActive ?? true;
    this.plan = props.plan ?? 'free';
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

  private set isActive(status: boolean) {
    this.props.isActive = status;
  }

  private set plan(plan: Account.Plan) {
    this.props.plan = plan;
  }
}
