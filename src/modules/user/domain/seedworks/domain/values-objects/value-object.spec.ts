import { ValueObject } from './value-object';

const makeSut = (value: any) => {
  class ValueObjectStub extends ValueObject {}
  return new ValueObjectStub(value);
};

describe('Value Object Base Class', () => {
  it('should set string value', () => {
    const sut = makeSut('string value');
    expect(sut.value).toEqual('string value');
  });

  it('should set object value', () => {
    const sut = makeSut({ key: 'value' });
    expect(sut.value).toEqual({ key: 'value' });
  });
});
