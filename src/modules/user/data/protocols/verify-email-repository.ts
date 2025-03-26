export interface VerifyEmailRepository {
  verify(email: string): Promise<boolean>;
}
