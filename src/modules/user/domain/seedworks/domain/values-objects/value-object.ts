export abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {}
}
