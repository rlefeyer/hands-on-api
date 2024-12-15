import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Item } from 'src/items/entities/item.entity';

const mockRestaurant = {
    id: 1,
    name: 'Mock Restaurant',
    address: '123 Mock Street',
  };
  
  const mockItem = {
    id: 1,
    name: 'Menu 1',
    restaurant: mockRestaurant,
  };
  
  const mockOrder = {
    id: 1,
    items: [mockItem],
    price: 15.99,
    userId: 1,
  };
  

const mockUser = { id: 1, name: 'User 1' };

const mockOrderRepository = {
  create: jest.fn().mockImplementation(dto => dto),
  save: jest.fn().mockResolvedValue(mockOrder),
  find: jest.fn().mockResolvedValue([mockOrder]),
  findOne: jest.fn(({ where: { id } }) =>
    id === 1 ? Promise.resolve(mockOrder) : Promise.resolve(null),
  ),
  delete: jest.fn().mockResolvedValue({ affected: 1, raw: {} } as DeleteResult),
};

const mockItemRepository = {
  findByIds: jest.fn().mockResolvedValue([mockItem]),
};

const mockUserRepository = {
  findOne: jest.fn(({ where: { id } }) =>
    id === 1 ? Promise.resolve(mockUser) : Promise.resolve(null),
  ),
};

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getRepositoryToken(Order), useValue: mockOrderRepository },
        { provide: getRepositoryToken(Item), useValue: mockItemRepository },
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new order', async () => {
      const createOrderDto: CreateOrderDto = {
        items: [1],
        price: 15.99,
        userId: 1,
      };

      const result = await service.create(createOrderDto);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockItemRepository.findByIds).toHaveBeenCalledWith([1]);
      expect(mockOrderRepository.create).toHaveBeenCalledWith({
        items: [mockItem],
        price: 15.99,
        userId: 1,
      });
      expect(mockOrderRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockOrder);
    });

    it('should throw NotFoundException if the user does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);
      const createOrderDto: CreateOrderDto = {
        items: [1],
        price: 15.99,
        userId: 2,
      };

      await expect(service.create(createOrderDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if menus are invalid', async () => {
      mockItemRepository.findByIds.mockResolvedValueOnce([]);
      const createOrderDto: CreateOrderDto = {
        items: [2],
        price: 15.99,
        userId: 1,
      };

      await expect(service.create(createOrderDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      const result = await service.findAll();
      expect(mockOrderRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockOrder]);
    });
  });

  describe('findOne', () => {
    it('should return an order by ID', async () => {
      const result = await service.findOne(1);
      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['items'],
      });
      expect(result).toEqual(mockOrder);
    });

    it('should throw NotFoundException if the order does not exist', async () => {
      await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the order', async () => {
      const updateOrderDto: UpdateOrderDto = { price: 20.99, items: [1] };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockOrder);

      const result = await service.update(1, updateOrderDto);
      expect(mockItemRepository.findByIds).toHaveBeenCalledWith([1]);
      expect(mockOrderRepository.save).toHaveBeenCalledWith({
        ...mockOrder,
        items: [mockItem],
        price: 20.99,
      });
      expect(result).toEqual(mockOrder);
    });

    it('should throw NotFoundException if menus are invalid', async () => {
      mockItemRepository.findByIds.mockResolvedValueOnce([]);
      const updateOrderDto: UpdateOrderDto = { items: [2] };

      await expect(service.update(1, updateOrderDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete the order', async () => {
      const result = await service.remove(1);
      expect(mockOrderRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if the order does not exist', async () => {
      mockOrderRepository.delete.mockResolvedValueOnce({
        affected: 0,
        raw: {},
      } as DeleteResult);

      await expect(service.remove(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getMenus', () => {
    it('should return menus of the order', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockOrder);

      const result = await service.getMenus(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockOrder.items);
    });
  });

  describe('getOrdersByUserId', () => {
    it('should return orders of a user', async () => {
      const result = await service.getOrdersByUserId(1);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockOrderRepository.find).toHaveBeenCalledWith({
        where: { userId: 1 },
        relations: ['items'],
      });
      expect(result).toEqual([mockOrder]);
    }); 

    it('should throw NotFoundException if the user does not exist', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.getOrdersByUserId(2)).rejects.toThrow(NotFoundException);
    });
  });
});
