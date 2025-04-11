import { DecodeToken } from '@/modules/auth/data/protocols/decode-token';
import { DecodeTokenService } from './protocols/decode-token-service';

export class AuthService implements DecodeTokenService {
  constructor(private readonly verifyTokenDecode: DecodeToken) {}

  decodeToken(token: string): any {
    return this.verifyTokenDecode.decode(token);
  }
}
