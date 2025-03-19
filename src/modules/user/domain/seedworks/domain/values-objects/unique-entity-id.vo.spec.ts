import { UniqueEntityIdError } from '../../errors/unique-entity-id-error';
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
    expect(() => makeSut('invalid_id')).toThrow(new UniqueEntityIdError());
  });

  it('should check if validate method is called', () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    expect(() => makeSut('invalid_id')).toThrow(new UniqueEntityIdError());
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
