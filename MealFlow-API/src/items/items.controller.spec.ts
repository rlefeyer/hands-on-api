import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { NotFoundException } from '@nestjs/common';

const mockItem = {
  id: 1,
  name: 'BigMac',
  restaurant: { id: 1, name: 'McDonalds', address: '123 Main St' },
};

const mockItemsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: mockItemsService,
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new item', async () => {
      const createItemDto: CreateItemDto = { name: 'BigMac', price: 5.99, restaurantId: 1 };
      mockItemsService.create.mockResolvedValue(mockItem);

      const result = await controller.create(createItemDto);
      expect(service.create).toHaveBeenCalledWith(createItemDto);
      expect(result).toEqual(mockItem);
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      mockItemsService.findAll.mockResolvedValue([mockItem]);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockItem]);
    });
  });

  describe('findOne', () => {
    it('should return an item if it exists', async () => {
      mockItemsService.findOne.mockResolvedValue(mockItem);

      const result = await controller.findOne(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockItem);
    });

    it('should throw NotFoundException if the item does not exist', async () => {
      mockItemsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the updated item', async () => {
      const updateItemDto: UpdateItemDto = { name: 'BigMac Updated', price: 6.99 };
      mockItemsService.update.mockResolvedValue({ ...mockItem, ...updateItemDto });

      const result = await controller.update(1, updateItemDto);
      expect(service.update).toHaveBeenCalledWith(1, updateItemDto);
      expect(result).toEqual({ ...mockItem, ...updateItemDto });
    });
  });

  describe('remove', () => {
    it('should delete the item', async () => {
      mockItemsService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if the item does not exist', async () => {
      mockItemsService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove(2)).rejects.toThrow(NotFoundException);
    });
  });
});
