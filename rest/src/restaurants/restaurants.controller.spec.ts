import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let service: RestaurantsService;

  const mockRestaurantsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockRestaurant: Restaurant = {
    id: '1',
    name: 'Test Restaurant',
    adresse: '123 Test Street',
    description: 'Test Description',
    items: [],
    note: 4.5,
    horaires: '9-22h',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        {
          provide: RestaurantsService,
          useValue: mockRestaurantsService,
        },
      ],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    service = module.get<RestaurantsService>(RestaurantsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new restaurant', async () => {
      const createRestaurantDto = {
        name: 'Test Restaurant',
        adresse: '123 Test Street',
        description: 'Test Description',
        items: [],
        note: 4.5,
        horaires: '9-22h',
      };

      mockRestaurantsService.create.mockResolvedValue(mockRestaurant);

      const result = await controller.create(createRestaurantDto);
      expect(result).toEqual(mockRestaurant);
      expect(mockRestaurantsService.create).toHaveBeenCalledWith(
        createRestaurantDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return all restaurants', async () => {
      mockRestaurantsService.findAll.mockResolvedValue([mockRestaurant]);

      const result = await controller.findAll();
      expect(result).toEqual([mockRestaurant]);
      expect(mockRestaurantsService.findAll).toHaveBeenCalled();
    });

    it('should filter restaurants by name and address', async () => {
      mockRestaurantsService.findAll.mockResolvedValue([mockRestaurant]);

      await controller.findAll('Test', '123 Test');
      expect(mockRestaurantsService.findAll).toHaveBeenCalledWith(
        'Test',
        '123 Test',
      );
    });
  });

  describe('findOne', () => {
    it('should return a restaurant by id', async () => {
      mockRestaurantsService.findOne.mockResolvedValue(mockRestaurant);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockRestaurant);
      expect(mockRestaurantsService.findOne).toHaveBeenCalledWith('1');
    });

    it('should handle NotFoundException', async () => {
      mockRestaurantsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a restaurant', async () => {
      const updateRestaurantDto = {
        name: 'Updated Restaurant',
      };
      const updatedRestaurant = { ...mockRestaurant, ...updateRestaurantDto };

      mockRestaurantsService.update.mockResolvedValue(updatedRestaurant);

      const result = await controller.update('1', updateRestaurantDto);
      expect(result).toEqual(updatedRestaurant);
      expect(mockRestaurantsService.update).toHaveBeenCalledWith(
        '1',
        updateRestaurantDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a restaurant', async () => {
      mockRestaurantsService.remove.mockResolvedValue(undefined);

      await controller.remove('1');
      expect(mockRestaurantsService.remove).toHaveBeenCalledWith('1');
    });

    it('should handle NotFoundException', async () => {
      mockRestaurantsService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
