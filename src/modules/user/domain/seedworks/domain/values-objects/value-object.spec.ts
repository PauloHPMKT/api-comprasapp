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

  it('should convert object value to string', () => {
    const date = new Date();
    // eslint-disable-next-line prefer-const
    let arrange = [
      { received: 'value', expected: 'value' },
      { received: 1.1, expected: '1.1' },
      { received: true, expected: 'true' },
      { received: false, expected: 'false' },
      {
        received: { prop1: 'value1' },
        expected: JSON.stringify({ prop1: 'value1' }),
      },
      { received: date, expected: date.toString() },
      { received: { key: 'value' }, expected: '{"key":"value"}' },
    ];

    arrange.forEach((value) => {
      const vo = makeSut(value.received);
      expect(vo + '').toBe(value.expected);
    });
  });
});
