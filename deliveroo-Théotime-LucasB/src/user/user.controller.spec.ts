import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = { name: 'John Doe', address: '123 Main St', telephone: '+1234567890' };
      const result = { id: 1, ...createUserDto };

      mockUserService.create.mockResolvedValue(result);

      expect(await userController.create(createUserDto)).toEqual(result);
      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users: User[] = [
        { id: 1, name: 'John Doe', address: '123 Main St', telephone: '+1234567890', commandes: [] },
      ];

      mockUserService.findAll.mockResolvedValue(users);

      expect(await userController.findAll()).toEqual(users);
      expect(mockUserService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const user: User = { id: 1, name: 'John Doe', address: '123 Main St', telephone: '+1234567890', commandes: [] };

      mockUserService.findOne.mockResolvedValue(user);

      expect(await userController.findOne('1')).toEqual(user);
      expect(mockUserService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const updateUserDto: UpdateUserDto = { name: 'John Updated', address: '456 Elm St', telephone: '+0987654321' };
      const result = { id: 1, ...updateUserDto };

      mockUserService.update.mockResolvedValue(result);

      expect(await userController.update('1', updateUserDto)).toEqual(result);
      expect(mockUserService.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should delete a user by ID', async () => {
      mockUserService.remove.mockResolvedValue({ deleted: true });

      expect(await userController.remove('1')).toEqual({ deleted: true });
      expect(mockUserService.remove).toHaveBeenCalledWith(1);
    });
  });
});
