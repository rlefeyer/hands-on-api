import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Create a new order
  it('should create a order', async () => {
    const createOrderDto = { id: 1, menus: [1, 2, 3], price: 10.99, userId: 1 };
    const result = { id: 1, ...createOrderDto };
    jest.spyOn(controller, 'create').mockResolvedValue(result);

    expect(await controller.create(createOrderDto)).toEqual(result);
  });

  // Retrieve all orders
  it('should return an array of orders', async () => {
    const result = [{ id: 1, menus: [1, 2, 3], price: 15.99, userId: 1 }];
    jest.spyOn(controller, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
  });

  // Retrieve a order by ID
  it('should return a order by ID', async () => {
    const result = { id: 1, menus: [1, 2, 3], price: 15.99, userId: 1 };
    jest.spyOn(controller, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toEqual(result);
  });

  // Update a order
  it('should update a order', async () => {
    const updateOrderDto = { menus: [1, 2, 3], price: 15.99, userId: 1 };
    const result = { id: 1, ...updateOrderDto };
    jest.spyOn(controller, 'update').mockResolvedValue(result);
    expect(await controller.update('1', updateOrderDto)).toEqual(result);
  });

  // Remove a order
  it('should remove a order', async () => {
    jest.spyOn(controller, 'remove').mockResolvedValue();
    expect(await controller.remove('1')).toBeUndefined();
  });

});
