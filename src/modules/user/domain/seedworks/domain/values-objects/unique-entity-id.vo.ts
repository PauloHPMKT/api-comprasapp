import { randomBytes } from 'crypto';
import { UniqueEntityIdError } from '../../errors/unique-entity-id-error';
import { ValueObject } from './value-object';

export class UniqueEntityId extends ValueObject<string> {
  constructor(id?: string) {
    super(id || randomBytes(12).toString('hex'));
    this.validate();
  }

  private validate() {
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(this.value)) {
      throw new UniqueEntityIdError();
    }
  }
}
