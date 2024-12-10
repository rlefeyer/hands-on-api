import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { name: 'John Doe', address: '123 Main St', telephone: '+1234567890' };
      const user: User = { id: 1, ...createUserDto, commandes: [] };

      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockResolvedValue(user);

      expect(await userService.create(createUserDto)).toEqual(user);
      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw an InternalServerErrorException on failure', async () => {
      const createUserDto: CreateUserDto = { name: 'John Doe', address: '123 Main St', telephone: '+1234567890' };
      mockUserRepository.save.mockRejectedValue(new Error());

      await expect(userService.create(createUserDto)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users: User[] = [
        { id: 1, name: 'John Doe', address: '123 Main St', telephone: '+1234567890', commandes: [] },
      ];
      mockUserRepository.find.mockResolvedValue(users);

      expect(await userService.findAll()).toEqual(users);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });

    it('should throw an InternalServerErrorException on failure', async () => {
      mockUserRepository.find.mockRejectedValue(new Error());

      await expect(userService.findAll()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user: User = { id: 1, name: 'John Doe', address: '123 Main St', telephone: '+1234567890', commandes: [] };
      mockUserRepository.findOneBy.mockResolvedValue(user);

      expect(await userService.findOne(1)).toEqual(user);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw a NotFoundException if user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(userService.findOne(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw an InternalServerErrorException on failure', async () => {
      mockUserRepository.findOneBy.mockRejectedValue(new Error());

      await expect(userService.findOne(1)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('update', () => {
    it('should update a user and return the updated user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'John Updated', address: '456 Elm St', telephone: '+0987654321' };
      const user: User = {
        id: 1,
        name: updateUserDto.name,
        address: updateUserDto.address,
        telephone: updateUserDto.telephone,
        commandes: [],
      };
  
      mockUserRepository.update.mockResolvedValue({ affected: 1 });
      jest.spyOn(userService, 'findOne').mockResolvedValue(user);
  
      expect(await userService.update(1, updateUserDto)).toEqual(user);
      expect(mockUserRepository.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  
    it('should throw a NotFoundException if user not found', async () => {
      mockUserRepository.update.mockResolvedValue({ affected: 0 });
  
      await expect(userService.update(1, {} as UpdateUserDto)).rejects.toThrow(NotFoundException);
    });
  
    it('should throw an InternalServerErrorException on failure', async () => {
      mockUserRepository.update.mockRejectedValue(new Error());
  
      await expect(userService.update(1, {} as UpdateUserDto)).rejects.toThrow(InternalServerErrorException);
    });
  });
  

  describe('remove', () => {
    it('should delete a user', async () => {
      mockUserRepository.delete.mockResolvedValue({ affected: 1 });

      await expect(userService.remove(1)).resolves.toBeUndefined();
      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if user not found', async () => {
      mockUserRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(userService.remove(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw an InternalServerErrorException on failure', async () => {
      mockUserRepository.delete.mockRejectedValue(new Error());

      await expect(userService.remove(1)).rejects.toThrow(InternalServerErrorException);
    });
  });
});