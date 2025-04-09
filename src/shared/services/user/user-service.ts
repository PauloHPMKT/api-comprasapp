import {
  VerifyEmailRepository,
  AddUserRepository,
  FindUserByEmailRepository,
} from '@/modules/user/data/protocols';
import {
  VerifyEmailService,
  AddUserService,
  FindUserByEmailService,
} from './protocols';
import { UserModel } from '@/modules/user/domain/models/user-model';

export class UserService
  implements VerifyEmailService, AddUserService, FindUserByEmailService
{
  constructor(
    private readonly verifyEmailRepository: VerifyEmailRepository,
    private readonly addUserRepository: AddUserRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
  ) {}

  async verifyEmail(email: string): Promise<boolean> {
    return this.verifyEmailRepository.verify(email);
  }

  async addUser(user: any): Promise<any> {
    return this.addUserRepository.create(user);
  }

  async findByEmail(email: string): Promise<UserModel.Params | null> {
    return this.findUserByEmailRepository.findByEmail(email);
  }
}
