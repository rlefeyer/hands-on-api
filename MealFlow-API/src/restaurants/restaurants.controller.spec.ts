import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { NotFoundException } from '@nestjs/common';

const mockRestaurant = {
  id: 1,
  name: 'McDonald\'s',
  description: 'Fast food burgers and more',
  address: '1 Rue de Lille, Lille',
  menus: [],
  rating: 4.5,
  openingHours: 'Monday - Friday: 12 PM - 3 PM, 7 PM - 11 PM',
};

const mockRestaurantsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let service: RestaurantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        { provide: RestaurantsService, useValue: mockRestaurantsService },
      ],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    service = module.get<RestaurantsService>(RestaurantsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new restaurant', async () => {
      const createRestaurantDto: CreateRestaurantDto = {
        name: 'McDonald\'s',
        description: 'Fast food burgers and more',
        address: '1 Rue de Lille, Lille',
      };
      mockRestaurantsService.create.mockResolvedValue(mockRestaurant);

      const result = await controller.create(createRestaurantDto);
      expect(service.create).toHaveBeenCalledWith(createRestaurantDto);
      expect(result).toEqual(mockRestaurant);
    });
  });

  describe('findAll', () => {
    it('should return all restaurants', async () => {
      mockRestaurantsService.findAll.mockResolvedValue([mockRestaurant]);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockRestaurant]);
    });
  });

  describe('findOne', () => {
    it('should return a restaurant by ID', async () => {
      mockRestaurantsService.findOne.mockResolvedValue(mockRestaurant);

      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockRestaurant);
    });

    it('should throw NotFoundException if the restaurant does not exist', async () => {
      mockRestaurantsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a restaurant', async () => {
      const updateRestaurantDto: UpdateRestaurantDto = { name: 'KFC' };
      mockRestaurantsService.update.mockResolvedValue({
        ...mockRestaurant,
        ...updateRestaurantDto,
      });

      const result = await controller.update('1', updateRestaurantDto);
      expect(service.update).toHaveBeenCalledWith(1, updateRestaurantDto);
      expect(result).toEqual({
        ...mockRestaurant,
        ...updateRestaurantDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a restaurant', async () => {
      mockRestaurantsService.remove.mockResolvedValue(undefined);

      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if the restaurant does not exist', async () => {
      mockRestaurantsService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('2')).rejects.toThrow(NotFoundException);
    });
  });
});
