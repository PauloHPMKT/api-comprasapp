export type AccountProps = {
  userId: string;
  isActive?: boolean;
};

export class Account {
  constructor(public readonly props: AccountProps) {
    this.props.isActive = props.isActive || true;
  }
}
