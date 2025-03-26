import {
  VerifyEmailRepository,
  AddUserRepository,
} from '@/modules/user/data/protocols';
import { VerifyEmailService, AddUserService } from './protocols';

export class UserService implements VerifyEmailService, AddUserService {
  constructor(
    private readonly verifyEmailRepository: VerifyEmailRepository,
    private readonly addUserRepository: AddUserRepository,
  ) {}

  async verifyEmail(email: string): Promise<boolean> {
    return this.verifyEmailRepository.verify(email);
  }

  async addUser(user: any): Promise<any> {
    return this.addUserRepository.create(user);
  }
}
