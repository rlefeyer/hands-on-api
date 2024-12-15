import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    authService = {
      validateUser: jest.fn((name: string, password: string) =>
        Promise.resolve(
          name === 'testuser' && password === 'password123'
            ? {
                id: 1,
                name: 'testuser',
                password: 'password123',
                address: '123 Main St',
                phone: '1234567890',
                roles: 'User', 
              }
            : null,
        ),
      ),
      generateJwt: jest.fn(() => Promise.resolve('mockJwtToken')),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authService },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(() => Promise.resolve('mockJwtToken')),
            verifyAsync: jest.fn(() =>
              Promise.resolve({ id: 1, name: 'testuser', roles: 'User' }),
            ),
          },
        },
        Reflector,
        AuthGuard,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signin', () => {
    it('should return a token for valid credentials', async () => {
      const token = await controller.signin({ name: 'testuser', password: 'password123' });
      expect(token).toEqual({ accessToken: 'mockJwtToken' });
    });

    it('should throw an error for invalid credentials', async () => {
      await expect(
        controller.signin({ name: 'wronguser', password: 'wrongpassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('should return user profile for a valid token', async () => {
      const mockRequest = { user: { id: 1, name: 'testuser', roles: 'User' } };
      const profile = controller.getProfile(mockRequest as any);
      expect(profile).toEqual({ id: 1, name: 'testuser', roles: 'User' });
    });
  });
});
