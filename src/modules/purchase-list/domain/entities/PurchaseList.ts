export type ProductProps = {
  title: string;
  description?: string | null;
  products: Products.toCreate[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
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
    this.props.description = this.props.description ?? null;
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.updatedAt = this.props.updatedAt ?? null;
  }
}

export namespace Products {
  export type toCreate = {
    name: string;
    quantity: number;
    price?: number;
  };
}
