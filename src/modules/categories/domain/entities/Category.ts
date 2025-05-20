export type CategoryProps = {
  name: string;
  icon: string;
};

export class Category {
  constructor(public readonly props: CategoryProps) {}
}
