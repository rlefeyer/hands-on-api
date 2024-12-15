import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const mockUser = {
  id: 1,
  name: 'Paul Debril',
  address: '123 rue calais',
  password: 'password',
  phone: '0606060606',
  roles: 'User',
};

const mockUserRepository = {
  create: jest.fn().mockImplementation(dto => dto),
  save: jest.fn().mockResolvedValue(mockUser),
  find: jest.fn().mockResolvedValue([mockUser]),
  findOne: jest.fn(({ where: { id } }) => 
    id === 1 ? Promise.resolve(mockUser) : Promise.resolve(null),
  ),
  delete: jest.fn().mockResolvedValue({ affected: 1, raw: {} } as DeleteResult),
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Paul Debril',
        address: '123 rue calais',
        password: 'password',
        phone: '0606060606',
        roles: 'User', 
      };

      const result = await service.create(createUserDto);
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if the user does not exist', async () => {
      await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'John Doe', roles: 'Admin' }; 

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockUser);

      const result = await service.update(1, updateUserDto);
      expect(repository.save).toHaveBeenCalledWith({
        ...mockUser,
        ...updateUserDto,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should delete the user', async () => {
      const result = await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if the user does not exist', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValueOnce({
        affected: 0,
        raw: {},
      } as DeleteResult);

      await expect(service.remove(2)).rejects.toThrow(NotFoundException);
    });
  });
});
