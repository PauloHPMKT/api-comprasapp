import { UniqueEntityId } from '../values-objects/unique-entity-id.vo';
import Entity from './entity';

const makeSut = (
  props: { prop1: string; prop2: number },
  id?: UniqueEntityId,
) => {
  class EntityStub extends Entity<typeof props> {}

  return new EntityStub(props, id);
};

describe('Entity abstraction', () => {
  it('should set props and id', () => {
    const sut = makeSut({ prop1: 'prop1 value', prop2: 10 });
    expect(sut.props).toStrictEqual({ prop1: 'prop1 value', prop2: 10 });
    expect(sut.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
  });
});
