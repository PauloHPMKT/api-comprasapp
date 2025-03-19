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
});
