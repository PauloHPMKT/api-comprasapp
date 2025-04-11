export interface VerifyListRepository {
  verify(title: string, userId: string): Promise<boolean>;
}
