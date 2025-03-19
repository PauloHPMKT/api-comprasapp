import { UniqueEntityId } from './unique-entity-id.vo';

const makeSut = (): UniqueEntityId => {
  return new UniqueEntityId('fake id');
};

describe('UniqueEntityId Value Object', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(UniqueEntityId);
    expect(sut).toBeTruthy();
  });
});
