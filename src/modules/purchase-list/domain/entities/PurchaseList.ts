export type ProductProps = {
  name: string;
};

export class PurchaseList {
  constructor(public readonly props: ProductProps) {}
}
