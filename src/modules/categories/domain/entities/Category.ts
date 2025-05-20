import Entity from '@/shared/seedworks/domain/entity/entity';
import { UniqueEntityId } from '@/shared/seedworks/domain/values-objects/unique-entity-id.vo';

export type CategoryProps = {
  name: string;
  icon: string;
  createdAt?: Date;
};

export class Category extends Entity<CategoryProps> {
  constructor(
    public readonly props: CategoryProps,
    id?: UniqueEntityId,
  ) {
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }
}
