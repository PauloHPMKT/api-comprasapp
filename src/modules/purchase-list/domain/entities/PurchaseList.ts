export type ProductProps = {
  title: string;
};

export class PurchaseList {
  constructor(public readonly props: ProductProps) {}
}
