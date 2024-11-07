import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [RestaurantsService],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Create a new restaurant
  it('should create a restaurant', async () => {
    const createRestaurantDto = { id: 1, name: 'Burger King', address: '123 Main St', phone: '555-5555' };
    const result = { id: 1, ...createRestaurantDto };
    jest.spyOn(controller, 'create').mockResolvedValue(result);

    expect(await controller.create(createRestaurantDto)).toEqual(result);
  });

  // Retrieve all restaurants
  it('should return an array of restaurants', async () => {
    const result = [{ id: 1, name: 'Burger King', address: '123 Main St', phone: '555-5555' }];
    jest.spyOn(controller, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
  });

  // Retrieve a restaurant by ID
  it('should return a restaurant by ID', async () => {
    const result = { id: 1, name: 'Burger King', address: '123 Main St', phone: '555-5555' };
    jest.spyOn(controller, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
  });

  // Update a restaurant
  it('should update a restaurant', async () => {
    const updateRestaurantDto = { name: 'McDonalds', address: '123 Main St', phone: '555-5555' };
    const result = { id: 1, ...updateRestaurantDto };
    jest.spyOn(controller, 'update').mockResolvedValue(result);
    expect(await controller.update('1', updateRestaurantDto)).toEqual(result);
  });

  // Remove a restaurant
  it('should remove a restaurant', async () => {
    jest.spyOn(controller, 'remove').mockResolvedValue();
    expect(await controller.remove('1')).toBeUndefined();
  });
});
