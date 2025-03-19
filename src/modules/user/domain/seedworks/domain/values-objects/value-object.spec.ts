import { ValueObject } from './value-object';

const makeSut = (value: any) => {
  class ValueObjectStub extends ValueObject {}
  return new ValueObjectStub(value);
};

describe('Value Object Base Class', () => {
  it('should set value', () => {
    const sut = makeSut('string value');
    expect(sut.value).toEqual('string value');
  });
});
