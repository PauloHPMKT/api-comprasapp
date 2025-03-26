import { MongoClient } from 'mongodb';

export const MongoHelper = {
  client: MongoClient as any,
  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },
  async disconnect(): Promise<void> {
    await this.client.close();
  },
  getCollection(name: string) {
    return this.client.db().collection(name);
  },
};
