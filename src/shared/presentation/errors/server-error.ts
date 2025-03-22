export class ServerError extends Error {
  constructor(message?: string) {
    super(message || 'Internal server error');
    this.name = 'ServerError';
  }
}
