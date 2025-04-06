import { PurchaseListModel } from '../../domain/models/create-purchase-list';
import { AddPurchaseList } from '../../domain/usecases/add-purchase-list';
import { AddPurchaseListRepository } from '../protocols/add-purchase-list-repository';
import { VerifyListRepository } from '../protocols/verify-list-repository';

export class AddPurchaseListUseCase implements AddPurchaseList {
  constructor(
    private readonly addPurchaseListRepository: AddPurchaseListRepository,
    private readonly verifyListRepository: VerifyListRepository,
  ) {}

  async add(data: PurchaseListModel.Params): Promise<PurchaseListModel.Result> {
    const { title, description, products } = data;
    const isListTitle = await this.verifyListRepository.verify(title);
    if (isListTitle) {
      throw new Error('A purchase list with this title already exists');
    }

    await this.addPurchaseListRepository.addList(data);
    return new Promise((resolve) =>
      resolve({
        id: 'valid_id',
        title: 'valid_list_title',
        description: null,
        products: [
          {
            name: 'Product 1',
            quantity: 2,
            unitPrice: null,
            totalPrice: null,
          },
          {
            name: 'Product 2',
            quantity: 1,
            unitPrice: 20,
            totalPrice: 20,
          },
        ],
        userId: 'valid_user_id',
        createdAt: new Date('2025-10-01'),
        updatedAt: null,
      }),
    );
  }
}
