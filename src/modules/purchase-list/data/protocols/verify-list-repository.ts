export interface VerifyListRepository {
  verify(title: string): Promise<boolean>;
}
