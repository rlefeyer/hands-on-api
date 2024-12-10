import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Mock du service RestaurantsService
const mockUserService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        age: 25,
        gender: 'male',
        password: 'password123',
      };
      mockUserService.create.mockResolvedValue(createUserDto);
      const result = await controller.create(createUserDto);
      expect(result).toEqual(createUserDto);
      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, name: 'John Doe' }];
      mockUserService.findAll.mockResolvedValue(users);
      const result = await controller.findAll();
      expect(result).toEqual(users);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return one user', async () => {
      const user = { id: 1, name: 'John Doe' };
      mockUserService.findOne.mockResolvedValue(user);
      const result = await controller.findOne('1');
      expect(result).toEqual(user);
      expect(mockUserService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'John Updated',
        username: 'johnupdated',
        email: 'john@john.com',
        age : 30,
        password: 'password',
        gender: 'm'
      };
      const updatedUser = { id: 1, ...updateUserDto };
      mockUserService.update.mockResolvedValue(updatedUser);
      const result = await controller.update('1', updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(mockUserService.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      mockUserService.remove.mockResolvedValue({ message: 'User deleted' });
      const result = await controller.remove('1');
      expect(result).toEqual({ message: 'User deleted' });
      expect(mockUserService.remove).toHaveBeenCalledWith(1);
    });
  });
});
