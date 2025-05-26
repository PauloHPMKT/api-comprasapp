export interface VerifyCategoryRepository {
  verify(name: string): Promise<boolean>;
}
