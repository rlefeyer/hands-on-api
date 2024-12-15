import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

const mockOrder = {
  id: 1,
  menus: [{ id: 1, name: 'Menu 1' }],
  price: 15.99,
  userId: 1,
};

const mockOrdersService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  getMenus: jest.fn(),
  getOrdersByUserId: jest.fn(),
};

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        { provide: OrdersService, useValue: mockOrdersService },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new order', async () => {
      const createOrderDto: CreateOrderDto = { items: [1], price: 15.99, userId: 1 };
      mockOrdersService.create.mockResolvedValue(mockOrder);

      const result = await controller.create(createOrderDto);
      expect(service.create).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      mockOrdersService.findAll.mockResolvedValue([mockOrder]);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockOrder]);
    });
  });

  describe('findOne', () => {
    it('should return an order by ID', async () => {
      mockOrdersService.findOne.mockResolvedValue(mockOrder);

      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockOrder);
    });

    it('should throw NotFoundException if the order does not exist', async () => {
      mockOrdersService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const updateOrderDto: UpdateOrderDto = { price: 20.99 };
      mockOrdersService.update.mockResolvedValue({ ...mockOrder, ...updateOrderDto });

      const result = await controller.update('1', updateOrderDto);
      expect(service.update).toHaveBeenCalledWith(1, updateOrderDto);
      expect(result).toEqual({ ...mockOrder, ...updateOrderDto });
    });
  });

  describe('remove', () => {
    it('should delete an order', async () => {
      mockOrdersService.remove.mockResolvedValue(undefined);

      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if the order does not exist', async () => {
      mockOrdersService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getMenus', () => {
    it('should return menus of the order', async () => {
      mockOrdersService.getMenus.mockResolvedValue(mockOrder.menus);

      const result = await controller.getMenus('1');
      expect(service.getMenus).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockOrder.menus);
    });
  });

  describe('getOrdersByUserId', () => {
    it('should return orders of a user', async () => {
      mockOrdersService.getOrdersByUserId.mockResolvedValue([mockOrder]);

      const result = await controller.getOrdersByUserId('1');
      expect(service.getOrdersByUserId).toHaveBeenCalledWith(1);
      expect(result).toEqual([mockOrder]);
    });

    it('should throw NotFoundException if the user does not exist', async () => {
      mockOrdersService.getOrdersByUserId.mockRejectedValue(new NotFoundException());

      await expect(controller.getOrdersByUserId('2')).rejects.toThrow(NotFoundException);
    });
  });
});
