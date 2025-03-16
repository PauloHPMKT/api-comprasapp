export interface VerifyAccountRepository {
  verify(email: string): Promise<boolean>;
}
