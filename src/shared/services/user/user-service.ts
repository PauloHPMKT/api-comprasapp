import {
  VerifyEmailRepository,
  AddUserRepository,
} from '@/modules/user/data/protocols';
import { VerifyEmailService, AddUserService } from './protocols';
import { UserModel } from '@/modules/user/domain/models/user-model';
import { FindUserByEmailRepository } from './protocols/find-user-by-email';

export class UserService
  implements VerifyEmailService, AddUserService, FindUserByEmailRepository
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
