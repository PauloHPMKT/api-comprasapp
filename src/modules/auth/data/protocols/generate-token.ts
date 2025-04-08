export interface GenerateToken {
  sign(payload: any): Promise<string>;
}
