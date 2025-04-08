import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols/encrypter';
import { CompareCrypto } from '../../data/protocols/compare-crypto';

export class BcryptAdapter implements Encrypter, CompareCrypto {
  constructor(private readonly salt: number) {}

  async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt);
  }

  async compareHash(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
