import { ObjectId } from 'mongodb';
import { MongoHelper } from '@/shared/infra/db/helper/mongo-client';
import { MongoCategoryRepository } from './mongo-category-repository';

const makeSut = (): MongoCategoryRepository => {
  return new MongoCategoryRepository();
};

describe('MongoCategoryRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const categoryCollection = MongoHelper.getCollection('categories');
    await categoryCollection.deleteMany({});
  });

  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeTruthy();
    expect(sut).toBeInstanceOf(MongoCategoryRepository);
  });

  it('should add a category on success', async () => {
    const sut = makeSut();
    const categoryData = {
      id: new ObjectId().toHexString(),
      name: 'Test Category',
      icon: '😀',
      createdAt: new Date('2025-12-10'),
    };
    await sut.create(categoryData);
    const categoryCollection = MongoHelper.getCollection('categories');
    const category = await categoryCollection.findOne({
      _id: MongoHelper.toObjectId(categoryData.id),
    });
    expect(category).toBeTruthy();
    expect(category._id).toBeTruthy();
    expect(category.name).toEqual(categoryData.name);
    expect(category.icon).toEqual(categoryData.icon);
    expect(category.createdAt).toEqual(new Date('2025-12-10'));
  });

  it('should return true if a category exists', async () => {
    const sut = makeSut();
    const getCollection = MongoHelper.getCollection('categories');
    await getCollection.insertOne({
      id: 'valid_id',
      name: 'valid_name',
      icon: '😀',
      createdAt: new Date('2025-12-10'),
    });
    const isCategory = await sut.verify('valid_name');
    expect(isCategory).toBe(true);
  });

  it('should return false if a category does not exist', async () => {
    const sut = makeSut();
    jest.spyOn(sut, 'verify').mockResolvedValueOnce(false);
    const getCollection = MongoHelper.getCollection('categories');
    await getCollection.insertOne({
      id: 'valid_id',
      name: 'valid_name',
      icon: '😀',
      createdAt: new Date('2025-12-10'),
    });
    const isCategory = await sut.verify('non_existent_category');
    expect(isCategory).toBe(false);
  });

  it('should return a list of categories on success', async () => {
    const sut = makeSut();
    const categoryCollection = MongoHelper.getCollection('categories');
    await categoryCollection.insertMany([
      {
        id: new ObjectId().toHexString(),
        name: 'Category 1',
        icon: '😀',
        createdAt: new Date('2025-12-10'),
      },
      {
        id: new ObjectId().toHexString(),
        name: 'Category 2',
        icon: '😃',
        createdAt: new Date('2025-12-10'),
      },
    ]);

    const categories = await sut.findAll();
    expect(categories).toBeTruthy();
    expect(categories.length).toBe(2);
    expect(categories).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        name: 'Category 1',
        icon: '😀',
        createdAt: new Date('2025-12-10'),
      }),
      expect.objectContaining({
        id: expect.any(String),
        name: 'Category 2',
        icon: '😃',
        createdAt: new Date('2025-12-10'),
      }),
    ]);
  });
});
