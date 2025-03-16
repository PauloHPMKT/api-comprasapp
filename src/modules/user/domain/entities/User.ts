import { randomBytes } from 'crypto';

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public avatar?: string;
  public createdAt?: Date;

  constructor(props: User.Construct, id?: string) {
    Object.assign(this, props);

    this.id = id || this.generateId();
    this.createdAt = props.createdAt ?? new Date();
    this.avatar = props.avatar ?? null;
  }

  private generateId(): string {
    return randomBytes(12).toString('hex');
  }

  updateAvatar(avatar: string): void {
    this.avatar = avatar;
  }
}

namespace User {
  export type Construct = Omit<User, 'id' | 'updateAvatar'>;
}
