export interface CompareCrypto {
  compareHash(value: string, hash: string): Promise<boolean>;
}
