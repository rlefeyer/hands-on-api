import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

   // Create a new user
  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe', address: '123 Main St', phone: '555-5555',
      id: 1
    };
    const result = { id: 1, ...createUserDto };
    jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(createUserDto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(createUserDto);
  });
  
  // Retrieve all users
  it('should return an array of users', async () => {
    const result = [{ id: 1, name: 'John Doe', address: '123 Main St', phone: '0606060606' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
    expect(service.findAll).toHaveBeenCalled();
  });

  // Retrieve a user by ID
  it('should return a user by ID', async () => {
    const result = { id: 1, name: 'John Doe', address: '123 Main St', phone: '0606060606' };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  // Update a user by ID
  it('should update a user by ID', async () => {
    const updateUserDto = { name: 'Jane Doe', address: '456 Elm St', phone: '555-5555' };
    const result = { id: 1, ...updateUserDto };
    jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update('1', updateUserDto)).toEqual(result);
    expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
  });

  // Delete a user by ID
  it('should delete a user by ID', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue();
    expect(await controller.remove('1')).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(1);
  });

});