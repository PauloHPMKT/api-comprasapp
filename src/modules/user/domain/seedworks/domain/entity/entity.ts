import { UniqueEntityId } from '../values-objects/unique-entity-id.vo';

export default class Entity<Props> {
  public readonly uniqueEntityId: UniqueEntityId;

  constructor(
    public readonly props: Props,
    id?: UniqueEntityId,
  ) {
    this.uniqueEntityId = id || new UniqueEntityId();
  }

  get id(): string {
    return this.uniqueEntityId.value;
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
