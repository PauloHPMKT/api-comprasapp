export interface VerifyEmailService {
  verifyEmail(email: string): Promise<boolean>;
}
