import { deepFreeze } from './deep-freeze';

describe('Object utils', () => {
  it('should not freeze a scalar string value', () => {
    const str = deepFreeze('test');
    expect(typeof str).toBe('string');
  });

  it('should not freeze a scalar number value', () => {
    const num = deepFreeze(1);
    expect(typeof num).toBe('number');
  });

  it('should not freeze a scalar boolean value if true', () => {
    const bool = deepFreeze(true);
    expect(typeof bool).toBe('boolean');
  });

  it('should not freeze a scalar boolean value if false', () => {
    const bool = deepFreeze(false);
    expect(typeof bool).toBe('boolean');
  });

  it('should be a imuatable object', () => {
    const obj = deepFreeze({
      prop1: 'value1',
      deep: { prop2: 'value2', prop3: new Date() },
    });
    expect(() => {
      (obj as any).prop1 = 'test';
    }).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'",
    );
    expect(() => {
      (obj as any).deep.prop2 = 'test';
    }).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'",
    );
    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });
});
