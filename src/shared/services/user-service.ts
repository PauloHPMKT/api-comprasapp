import { VerifyEmailRepository } from '@/modules/user/data/protocols/verify-email-repository';
import { AddUserRepository } from '@/modules/user/data/protocols/add-user-repository';
import { VerifyEmailService } from './protocols/verify-email';
import { AddUserService } from './protocols/add-user';

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
