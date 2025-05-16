export type CategoryProps = {
  name: string;
};

export class Category {
  constructor(public readonly props: CategoryProps) {}
}
