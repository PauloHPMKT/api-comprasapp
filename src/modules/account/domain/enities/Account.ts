import { randomBytes } from 'crypto';

export class Account {
  public readonly id: string;
  public userId: string;
  public status?: Account.Status;
  public plan?: Account.Plan;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Account.Construct, id?: string) {
    Object.assign(this, props);

    this.id = id || this.generateId();
    this.status = props.status ?? 'active';
    this.plan = props.plan ?? 'free';
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? null;
  }

  private generateId(): string {
    return randomBytes(12).toString('hex');
  }
}

export namespace Account {
  export type Status = 'active' | 'inactive';
  export type Plan = 'free' | 'premium';
  export type Construct = Omit<Account, 'id'>;
}
