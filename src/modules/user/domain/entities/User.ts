import { randomBytes } from 'crypto';

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public avatar?: string;
  public createdAt?: Date;

  constructor(props: Omit<User, 'id'>, id?: string) {
    this.id = id || randomBytes(12).toString('hex');
    this.avatar = props.avatar ?? null;
    this.createdAt = props.createdAt ?? new Date();
  }
}

console.log(
  new User({
    name: 'anyemail',
    email: 'anyemail@mail.com',
    password: 'anypassword',
  }),
);
