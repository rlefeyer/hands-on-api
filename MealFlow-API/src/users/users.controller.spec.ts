import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


const mockService = {  
    findOne: jest.fn().mockResolvedValue({ id: 6, name: 'Paul Debril' }),  
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  
  describe('UsersController', () => {
    let controller: UsersController;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [UsersController],
        providers: [UsersService],
      })
        .overrideProvider(UsersService)
        .useValue(mockService)
        .compile();
  
      controller = module.get<UsersController>(UsersController);
    });
  
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  
    it('should return a user', async () => {
      expect(await controller.findOne('6')).toEqual({ id: 6, name: 'Paul Debril' });
      expect(mockService.findOne).toHaveBeenCalledWith(6);
    });

    it('should return all users', async () => {
        await controller.findAll();
        expect(mockService.findAll).toHaveBeenCalled();
    });

    it('should create a user', async () => {
        const user = { name: 'Paul Debril', password:'password' , address: '1234 Rue des Lilas', phone: '01234567',roles:"admin" };
        await controller.create(user);
        expect(mockService.create).toHaveBeenCalledWith(user);
    });

    it('should update a user', async () => {
        const user = { name: 'Paul Debril', address: '1234 Rue des Lilas', phone: '01234567' };
        await controller.update('6', user);
        expect(mockService.update).toHaveBeenCalledWith(6, user);
    });

    it('should delete a user', async () => {
        await controller.remove('6');
        expect(mockService.remove).toHaveBeenCalledWith(6);
    });
});
  