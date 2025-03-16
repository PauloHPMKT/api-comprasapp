export class MissingParamsError extends Error {
  constructor(paramName: string) {
    super(`Missing params: ${paramName}`);
    this.name = 'MissingParamsError';
  }
}
