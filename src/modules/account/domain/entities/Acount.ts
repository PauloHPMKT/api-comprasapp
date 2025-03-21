export type AccountProps = {
  userId: string;
};

export class Account {
  constructor(public readonly props: AccountProps) {}
}
