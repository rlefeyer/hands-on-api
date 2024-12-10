import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let service: RestaurantsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [{ provide: RestaurantsService, useValue: mockService }],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    service = module.get<RestaurantsService>(RestaurantsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a restaurant', async () => {
      const createDto: CreateRestaurantDto = {
        name: 'Le Gourmet',
        description: 'Un restaurant gastronomique au cœur de la ville',
        address: '123 Rue de Paris, 75001 Paris',
        category: 'Gastronomie française',
        rating: 4.5,
        hours: '10:00 - 22:00',
      };
      const result = { id: 1, ...createDto };

      mockService.create.mockResolvedValue(result);

      expect(await controller.create(createDto)).toEqual(result);
      expect(mockService.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of restaurants', async () => {
      const result = [
        {
          id: 1,
          name: 'Le Gourmet',
          description: 'Un restaurant gastronomique au cœur de la ville',
          address: '123 Rue de Paris, 75001 Paris',
          category: 'Gastronomie française',
          rating: 4.5,
          hours: '10:00 - 22:00',
        },
      ];
      mockService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single restaurant', async () => {
      const result = {
        id: 1,
        name: 'Le Gourmet',
        description: 'Un restaurant gastronomique au cœur de la ville',
        address: '123 Rue de Paris, 75001 Paris',
        category: 'Gastronomie française',
        rating: 4.5,
        hours: '10:00 - 22:00',
      };
      mockService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an exception if the restaurant is not found', async () => {
      mockService.findOne.mockRejectedValue(new Error('Restaurant non trouvé.'));
      await expect(controller.findOne('1')).rejects.toThrow('Restaurant non trouvé.');
    });
  });

  describe('update', () => {
    it('should update a restaurant', async () => {
      const updateDto: UpdateRestaurantDto = { name: 'Updated Name' };
      const result = {
        id: 1,
        name: 'Updated Name',
        description: 'Un restaurant gastronomique au cœur de la ville',
        address: '123 Rue de Paris, 75001 Paris',
        category: 'Gastronomie française',
        rating: 4.5,
        hours: '10:00 - 22:00',
      };

      mockService.update.mockResolvedValue(result);

      expect(await controller.update('1', updateDto)).toEqual(result);
      expect(mockService.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a restaurant', async () => {
      mockService.remove.mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
      expect(mockService.remove).toHaveBeenCalledWith(1);
    });
  });
});
