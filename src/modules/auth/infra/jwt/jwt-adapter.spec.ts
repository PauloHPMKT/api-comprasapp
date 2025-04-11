import jwt from 'jsonwebtoken';
import { JwtAdapter } from './jwt-adapter';
import { AuthSignInModel } from '../../domain/models/auth-signin';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mocked-token'),
}));

const makeSut = () => {
  const mockPayload: AuthSignInModel.SignIn = {
    id: 'user-id',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'avatar-url',
    accountId: 'account-id',
    createdAt: new Date('2025-01-01'),
  };

  const sut = new JwtAdapter();
  return { sut, mockPayload };
};

describe('JwtAdapter', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(JwtAdapter);
    expect(sut).toBeTruthy();
  });

  it('should call jwt.sign with correct values', () => {
    const { sut, mockPayload } = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');

    sut.sign(mockPayload);
    expect(signSpy).toHaveBeenCalledWith(
      {
        sub: mockPayload.id,
        name: mockPayload.name,
        email: mockPayload.email,
        avatar: mockPayload.avatar,
        accountId: mockPayload.accountId,
        createdAt: mockPayload.createdAt,
      },
      '123456789',
      { expiresIn: '24h' },
    );
  });

  it('should return a token when jwt.sign is called', () => {
    const { sut, mockPayload } = makeSut();
    jest.spyOn(jwt, 'sign');
    const token = sut.sign(mockPayload);

    expect(token).toBe('mocked-token');
  });

  it('should throw if jwt.sign throws', () => {
    const { sut, mockPayload } = makeSut();
    jest.spyOn(jwt, 'sign').mockImplementation(() => {
      throw new Error('jwt error');
    });

    expect(() => sut.sign(mockPayload)).toThrow();
  });
});
