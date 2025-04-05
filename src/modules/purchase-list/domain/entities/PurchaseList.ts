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
    this.description = this.props.description;
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? null;
  }

  static createProduct(product: Products.toCreate): Products.toCreate {
    return {
      ...product,
      unitPrice: product.unitPrice ?? null,
      totalPrice: product.totalPrice ?? null,
    };
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description;
  }

  get products(): Products.toCreate[] {
    return this.props.products;
  }

  private set description(description: string | null) {
    this.props.description = description ?? null;
  }
}

export namespace Products {
  export type toCreate = {
    name: string;
    quantity: number;
    unitPrice?: number | null;
    totalPrice?: number | null;
  };
}

const purchaseList = new PurchaseList({
  title: 'List title',
  description: 'any description',
  products: [
    {
      name: 'Product 1',
      quantity: 2,
      unitPrice: null,
      totalPrice: null,
    },
    {
      name: 'Product 2',
      quantity: 1,
      unitPrice: 20,
      totalPrice: 20,
    },
  ],
  userId: 'anyuserid',
});

console.log(purchaseList.toJSON());
