import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      findBy: jest.fn((name, password) =>
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
    };

    jwtService = {
      signAsync: jest.fn(() => Promise.resolve('mockJwtToken')),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should validate user credentials and return the user', async () => {
      const user = await service.validateUser('testuser', 'password123');
      expect(user).toEqual({
        id: 1,
        name: 'testuser',
        password: 'password123',
        address: '123 Main St',
        phone: '1234567890',
        roles: 'User', 
      });
    });

    it('should return null if user credentials are invalid', async () => {
      const user = await service.validateUser('wronguser', 'wrongpassword');
      expect(user).toBeNull();
    });
  });

  describe('generateJwt', () => {
    it('should generate a JWT token for a valid user', async () => {
      const user = {
        id: 1,
        name: 'testuser',
        roles: 'User',
      };

      const token = await service.generateJwt(user);
      expect(token).toBe('mockJwtToken');
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: 1,
        username: 'testuser',
        role: 'User',
      });
    });
  });
});
