import Entity from '@/shared/seedworks/domain/entity/entity';
import { UniqueEntityId } from '@/shared/seedworks/domain/values-objects/unique-entity-id.vo';

export type ProductProps = {
  title: string;
  description?: string | null;
  products: Products.toCreate[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class PurchaseList extends Entity<ProductProps> {
  constructor(
    public readonly props: ProductProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
    this.props.products = props.products.map((product) =>
      PurchaseList.createProduct(product),
    );
    this.props.description = this.props.description ?? null;
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.updatedAt = this.props.updatedAt ?? null;
  }

  static createProduct(product: Products.toCreate): Products.toCreate {
    return {
      ...product,
      price: product.price ?? null,
    };
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description;
  }
}

export namespace Products {
  export type toCreate = {
    name: string;
    quantity: number;
    price?: number;
  };
}

const purchaseList = new PurchaseList({
  title: 'List title',
  description: 'any description',
  products: [
    {
      name: 'Product 1',
      quantity: 2,
      price: null,
    },
    {
      name: 'Product 2',
      quantity: 1,
      price: 20,
    },
  ],
  userId: 'anyuserid',
});

console.log(purchaseList.toJSON());
