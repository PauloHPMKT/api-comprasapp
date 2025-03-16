export interface VerifyUserRepository {
  verify(email: string): Promise<boolean>;
}
