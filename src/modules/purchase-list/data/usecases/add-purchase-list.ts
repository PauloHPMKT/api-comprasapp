import { PurchaseList } from '../../domain/entities/PurchaseList';
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
    const { title, description, products, userId } = data;
    const isListTitle = await this.verifyListRepository.verify(title, userId);
    if (isListTitle) {
      throw new Error('A purchase list with this title already exists');
    }

    const purchaseList = new PurchaseList({
      title,
      description,
      products,
      userId,
    }).toJSON();

    const createList =
      await this.addPurchaseListRepository.addList(purchaseList);

    return createList;
  }
}
