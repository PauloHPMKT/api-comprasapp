import jwt from 'jsonwebtoken';
import { GenerateToken } from '../../data/protocols/generate-token';
import { AuthSignInModel } from '../../domain/models/auth-signin';
import { UserPayload } from '../../domain/types/user-payload';

export class JwtGenerateToken implements GenerateToken {
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
}
