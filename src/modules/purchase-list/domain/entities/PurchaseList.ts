export type ProductProps = {
  title: string;
  products: Products.toCreate[];
  userId: string;
};

export class PurchaseList {
  constructor(public readonly props: ProductProps) {}
}

export namespace Products {
  export type toCreate = {
    name: string;
    quantity: number;
    price: number;
  };
}
