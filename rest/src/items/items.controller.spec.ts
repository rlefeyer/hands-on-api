import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Item } from './entities/item.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  const mockItemsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockItem: Item = {
    id: '1',
    name: 'Test Item',
    description: 'Test Description',
    price: 9.99,
    restaurant: {
      id: '1',
      name: 'Test Restaurant',
      adresse: '123 Test Street',
      items: [],
    },
  };

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new item', async () => {
      const createItemDto = {
        name: 'Test Item',
        description: 'Test Description',
        price: 9.99,
        restaurant: {
          id: '1',
          name: 'Test Restaurant',
          adresse: '123 Test Street',
          items: [],
        },
      };

      mockItemsService.create.mockResolvedValue(mockItem);

      const result = await controller.create(createItemDto);
      expect(result).toEqual(mockItem);
      expect(mockItemsService.create).toHaveBeenCalledWith(createItemDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      mockItemsService.findAll.mockResolvedValue([mockItem]);

      const result = await controller.findAll();
      expect(result).toEqual([mockItem]);
      expect(mockItemsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an item by id', async () => {
      mockItemsService.findOne.mockResolvedValue(mockItem);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockItem);
      expect(mockItemsService.findOne).toHaveBeenCalledWith('1');
    });

    it('should handle NotFoundException', async () => {
      mockItemsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const updateItemDto = {
        name: 'Updated Item',
        price: 19.99,
      };
      const updatedItem = { ...mockItem, ...updateItemDto };

      mockItemsService.update.mockResolvedValue(updatedItem);

      const result = await controller.update('1', updateItemDto);
      expect(result).toEqual(updatedItem);
      expect(mockItemsService.update).toHaveBeenCalledWith('1', updateItemDto);
    });
  });

  describe('remove', () => {
    it('should remove an item', async () => {
      mockItemsService.remove.mockResolvedValue(undefined);

      await controller.remove('1');
      expect(mockItemsService.remove).toHaveBeenCalledWith('1');
    });

    it('should handle NotFoundException', async () => {
      mockItemsService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
