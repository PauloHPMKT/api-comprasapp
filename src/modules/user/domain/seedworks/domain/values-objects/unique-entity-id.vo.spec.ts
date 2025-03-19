import { UniqueEntityId } from './unique-entity-id.vo';

const makeSut = (id?: string): UniqueEntityId => {
  return new UniqueEntityId(id || '');
};

describe('UniqueEntityId Value Object', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(UniqueEntityId);
    expect(sut).toBeTruthy();
  });

  it('should throw error if id is invalid', () => {
    expect(() => makeSut('invalid_id')).toThrow('Invalid id');
  });
});
