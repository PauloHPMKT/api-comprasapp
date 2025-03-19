import { randomBytes } from 'crypto';
import { UniqueEntityIdError } from '../../errors/unique-entity-id-error';

export class UniqueEntityId {
  private readonly id: string;
  constructor(id?: string) {
    this.id = id || randomBytes(12).toString('hex');
    this.validate();
  }

  private validate() {
    const idRegex = /^[0-9a-fA-F]{24}$/;
    if (!idRegex.test(this.id)) {
      throw new UniqueEntityIdError();
    }
  }
}
