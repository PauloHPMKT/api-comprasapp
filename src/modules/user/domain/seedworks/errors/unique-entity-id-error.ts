export class UniqueEntityIdError extends Error {
  constructor(message?: string) {
    super(message || 'ID must be valid');
    this.name = 'UniqueEntityIdError';
  }
}
