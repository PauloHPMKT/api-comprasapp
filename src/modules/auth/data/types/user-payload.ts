export interface UserPayload {
  sub: string | number;
  name: string;
  email: string;
  avatar?: string;
  accountId: string;
  createdAt: Date;
  iat?: number;
  exp?: number;
}
