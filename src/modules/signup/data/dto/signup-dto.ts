import { InvalidParamError } from '@/modules/shared/presentation/errors';

export class SignupDto {
  public name: string;
  public email: string;
  public password: string;
  public passwordConfirmation: string;

  constructor(props: Omit<SignupDto, 'matchPassword'>) {
    Object.assign(this, props);
  }

  matchPassword(): Error | null {
    if (this.password !== this.passwordConfirmation) {
      return new InvalidParamError('passwordConfirmation');
    }
    return null;
  }
}
