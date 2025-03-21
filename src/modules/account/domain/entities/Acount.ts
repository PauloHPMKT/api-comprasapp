export type AccountProps = {
  userId: string;
  isActive?: boolean;
  plan?: Account.Plan;
  createdAt?: Date;
};

export namespace Account {
  export type Plan = 'free' | 'premium';
}

export class Account {
  constructor(public readonly props: AccountProps) {
    this.props.isActive = props.isActive ?? true;
    this.props.plan = props.plan ?? 'free';
    this.props.createdAt = props.createdAt ?? new Date();
  }
}
