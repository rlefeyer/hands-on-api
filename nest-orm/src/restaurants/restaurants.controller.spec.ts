import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

// Mock du service RestaurantsService
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
        {
          provide: RestaurantsService,
          useValue: mockRestaurantsService,
        },
      ],
    }).compile();
    controller = module.get<RestaurantsController>(RestaurantsController);
    service = module.get<RestaurantsService>(RestaurantsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a restaurant', async () => {
      const createRestaurantDto: CreateRestaurantDto = {
        Name: 'Pizza Palace',
        Description: 'A place for the best pizza',
        Address: '123 Pizza St',
        Menus: ['Pizza Margherita', 'Pizza Pepperoni'],
        Note: '5',
        Schedules: 'Mon-Sun 10:00-22:00',
      };
      const restaurant = {
        ...createRestaurantDto,
        id: 1,
      };
      mockRestaurantsService.create.mockResolvedValue(restaurant);
      const result = await controller.create(createRestaurantDto);
      expect(result).toEqual(restaurant);
      expect(mockRestaurantsService.create).toHaveBeenCalledWith(
        createRestaurantDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return all restaurants', async () => {
      const restaurants = [
        { id: 1, Name: 'Pizza Palace' },
        { id: 2, Name: 'Burger King' },
      ];
      mockRestaurantsService.findAll.mockResolvedValue(restaurants);
      const result = await controller.findAll();
      expect(result).toEqual(restaurants);
      expect(mockRestaurantsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a restaurant by id', async () => {
      const restaurant = { id: 1, Name: 'Pizza Palace' };
      mockRestaurantsService.findOne.mockResolvedValue(restaurant);
      const result = await controller.findOne('1');
      expect(result).toEqual(restaurant);
      expect(mockRestaurantsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update and return a restaurant', async () => {
      const updateRestaurantDto: UpdateRestaurantDto = {
        Name: 'Updated Pizza Palace',
      };
      const updatedRestaurant = { id: 1, Name: 'Updated Pizza Palace' };
      mockRestaurantsService.update.mockResolvedValue(updatedRestaurant);
      mockRestaurantsService.findOne.mockResolvedValue(updatedRestaurant);
      const result = await controller.update('1', updateRestaurantDto);
      expect(result).toEqual(updatedRestaurant);
      expect(mockRestaurantsService.update).toHaveBeenCalledWith(
        1,
        updateRestaurantDto,
      );
      expect(mockRestaurantsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('remove', () => {
    it('should remove a restaurant', async () => {
      const restaurant = { id: 1, Name: 'Pizza Palace' };
      mockRestaurantsService.findOne.mockResolvedValue(restaurant);
      mockRestaurantsService.remove.mockResolvedValue(restaurant);
      const result = await controller.remove('1');
      expect(result).toEqual(restaurant);
      expect(mockRestaurantsService.remove).toHaveBeenCalledWith(1);
    });
  });
});
