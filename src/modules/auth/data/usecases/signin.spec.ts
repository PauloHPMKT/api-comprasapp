import { AuthSignInModel } from '../../domain/models/auth-signin';
import { GenerateToken } from '../protocols/generate-token';
import { SignInUseCase } from './signin';

const makeGenerateWebtoken = (): GenerateToken => {
  class GenerateWebtoken implements GenerateToken {
    sign(payload: AuthSignInModel.SignIn): string {
      return 'valid_token';
    }
  }
  return new GenerateWebtoken();
};

const makeSut = (): SutTypes => {
  const generateWebtokenStub = makeGenerateWebtoken();
  const sut = new SignInUseCase(generateWebtokenStub);
  return {
    sut,
    generateWebtokenStub,
  };
};

type SutTypes = {
  sut: SignInUseCase;
  generateWebtokenStub: GenerateToken;
};

describe('SginInUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(SignInUseCase);
    expect(sut).toBeTruthy();
  });

  it('should return access token from payload', async () => {
    const { sut, generateWebtokenStub } = makeSut();
    jest.spyOn(generateWebtokenStub, 'sign');
    const params = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      avatar: null,
      accountId: 'valid_account_id',
      createdAt: new Date('2025-01-01'),
    };
    const result = await sut.login(params);
    expect(result).toEqual({
      user: {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        avatar: null,
        accountId: 'valid_account_id',
        createdAt: new Date('2025-01-01'),
      },
      access_token: 'valid_token',
    });
  });

  it('should call GenerateWebtoken with correct payload', async () => {
    const { sut, generateWebtokenStub } = makeSut();
    const signSpy = jest.spyOn(generateWebtokenStub, 'sign');
    const params = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      avatar: null,
      accountId: 'valid_account_id',
      createdAt: new Date('2025-01-01'),
    };
    await sut.login(params);
    expect(signSpy).toHaveBeenCalledWith({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      avatar: null,
      accountId: 'valid_account_id',
      createdAt: new Date('2025-01-01'),
    });
  });

  it('should throw if GenerateWebtoken throws', async () => {
    const { sut, generateWebtokenStub } = makeSut();
    jest.spyOn(generateWebtokenStub, 'sign').mockImplementationOnce(() => {
      throw new Error('Token generation error');
    });
    const params = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      avatar: null,
      accountId: 'valid_account_id',
      createdAt: new Date('2025-01-01'),
    };
    await expect(sut.login(params)).rejects.toThrow();
  });
});
