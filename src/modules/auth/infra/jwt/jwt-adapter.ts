import jwt from 'jsonwebtoken';
import { GenerateToken } from '../../data/protocols/generate-token';
import { AuthSignInModel } from '../../domain/models/auth-signin';
import { UserPayload } from '../../data/types/user-payload';
import { DecodeToken } from '../../data/protocols/decode-token';
import e from 'express';

export class JwtAdapter implements GenerateToken, DecodeToken {
  sign(payload: AuthSignInModel.SignIn): string {
    const secret = '123456789';
    const userJwtPayload: UserPayload = {
      sub: payload.id,
      name: payload.name,
      email: payload.email,
      avatar: payload.avatar,
      accountId: payload.accountId,
      createdAt: payload.createdAt,
    };
    const token = jwt.sign(userJwtPayload, secret, {
      expiresIn: '24h',
    });

    return token;
  }

  decode(token: string): any {
    const decodedToken = jwt.verify(token, '123456789');
    if (!decodedToken) {
      throw new Error('Invalid token');
    }
    return decodedToken;
  }
}
