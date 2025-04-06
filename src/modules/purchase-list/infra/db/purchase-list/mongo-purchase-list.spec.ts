import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { MongoPurchaseListRepository } from './mongo-purchase-list';

const makeSut = (): MongoPurchaseListRepository => {
  return new MongoPurchaseListRepository();
};

describe('MongoPurchaseListRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('users');
    await accountCollection.deleteMany({});
  });

  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(MongoPurchaseListRepository);
    expect(sut).toBeTruthy();
  });

  it('should return true if a purchase list exists with the same title', async () => {
    const sut = makeSut();
    const getCollection = MongoHelper.getCollection('purchase-list');
    await getCollection.insertOne({
      id: 'valid_id',
      title: 'anytitle',
      description: 'anydescription',
      products: [
        {
          name: 'Product 1',
          quantity: 2,
          unitPrice: 10,
          totalPrice: 20,
        },
      ],
      userId: 'anyuserid',
    });
    const isList = await sut.verify('anytitle');
    expect(isList).toBe(true);
  });

  it('should return false if a purchase list does not exist with the same title', async () => {
    const sut = makeSut();
    jest.spyOn(sut, 'verify').mockResolvedValueOnce(false);
    const getCollection = MongoHelper.getCollection('purchase-list');
    await getCollection.insertOne({
      id: 'valid_id',
      title: 'anytitle',
      description: 'anydescription',
      products: [
        {
          name: 'Product 1',
          quantity: 2,
          unitPrice: 10,
          totalPrice: 20,
        },
      ],
      userId: 'anyuserid',
    });
    const isList = await sut.verify('anytitle');
    expect(isList).toBe(false);
  });
});
