import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    address: '123 Rue de Paris',
    phone: '0666666666',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new user', async () => {
      jest.spyOn(repository, 'create').mockReturnValue(mockUser);
      jest.spyOn(repository, 'save').mockResolvedValue(mockUser);

      const createUserDto = {
        name: 'John Doe',
        address: '123 Rue de Paris',
        phone: '0666666666',
      };

      expect(await service.create(createUserDto)).toEqual(mockUser);
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockUser]);

      expect(await service.findAll()).toEqual([mockUser]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(mockUser);

      expect(await service.findOne(1)).toEqual(mockUser);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException(`Utilisateur avec l'ID 1 non trouvé.`),
      );
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update and return the updated user', async () => {
      const updateUserDto = {
        name: 'Jane Doe',
        address: '456 Rue de Lyon',
        phone: '0777777777',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(repository, 'update').mockResolvedValue(undefined);
      jest.spyOn(repository, 'findOneBy').mockResolvedValue({
        ...mockUser,
        ...updateUserDto,
      });

      expect(await service.update(1, updateUserDto)).toEqual({
        ...mockUser,
        ...updateUserDto,
      });
      expect(repository.update).toHaveBeenCalledWith(1, {
        ...mockUser,
        ...updateUserDto,
      });
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

      expect(await service.remove(1)).toBeUndefined();
      expect(repository.remove).toHaveBeenCalledWith(mockUser);
    });
  });
});
