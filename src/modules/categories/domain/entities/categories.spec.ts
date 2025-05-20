import { UniqueEntityId } from '@/shared/seedworks/domain/values-objects/unique-entity-id.vo';
import { Category, CategoryProps } from './Category';

const makeSut = (id?: UniqueEntityId) => {
  const categoryProps: CategoryProps = {
    name: 'anycategoryname',
    icon: '😀',
  };
  return new Category(categoryProps, id);
};

describe('Category Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(Category);
    expect(sut).toBeTruthy();
  });

  it('should create a new Category with name', () => {
    const sut = makeSut();
    expect(sut.props.name).toBe('anycategoryname');
  });

  it('should create a new Category with icon as emoji', () => {
    const sut = makeSut();
    expect(sut.props.icon).toEqual('😀');
    expect(typeof sut.props.icon).toBe('string');
  });

  it('should create a new Category with a valid date', () => {
    const sut = makeSut();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('should create a new Category with a valid id', () => {
    const id = new UniqueEntityId('5c84559c9ea984bd9b1f2bc6');
    const sut = makeSut(id);
    expect(sut.id).not.toBeUndefined();
    expect(sut.id).not.toBeNull();
    expect(sut.id).toEqual(id.value);
    expect(sut.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
  });
});
