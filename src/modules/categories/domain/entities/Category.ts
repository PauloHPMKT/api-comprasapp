export type CategoryProps = {
  name: string;
  icon: string;
  createdAt?: Date;
};

export class Category {
  constructor(public readonly props: CategoryProps) {
    this.props.createdAt = this.props.createdAt ?? new Date();
  }
}
