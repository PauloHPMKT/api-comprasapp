export type ProductProps = {
  title: string;
  products: Products.toCreate[];
  userId: string;
  createdAt?: Date;
};

export class PurchaseList {
  constructor(public readonly props: ProductProps) {
    this.props = {
      ...props,
      products: props.products.map((product) => ({
        ...product,
        price: product.price ?? null,
      })),
    };
    this.props.createdAt = this.props.createdAt ?? new Date();
  }
}

export namespace Products {
  export type toCreate = {
    name: string;
    quantity: number;
    price?: number;
  };
}
