import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

describe('ItemsService', () => {
  let service: ItemsService;
  let repository: Repository<Item>;

  const mockItemRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockItemRepository,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    repository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      mockItemRepository.create.mockReturnValue(mockItem);
      mockItemRepository.save.mockResolvedValue(mockItem);

      const result = await service.create(createItemDto);
      expect(result).toEqual(mockItem);
      expect(mockItemRepository.create).toHaveBeenCalledWith(createItemDto);
      expect(mockItemRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      mockItemRepository.find.mockResolvedValue([mockItem]);

      const result = await service.findAll();
      expect(result).toEqual([mockItem]);
      expect(mockItemRepository.find).toHaveBeenCalledWith({
        relations: ['restaurant'],
      });
    });
  });

  describe('findOne', () => {
    it('should return an item by id', async () => {
      mockItemRepository.findOne.mockResolvedValue(mockItem);

      const result = await service.findOne('1');
      expect(result).toEqual(mockItem);
      expect(mockItemRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['restaurant'],
      });
    });

    it('should throw NotFoundException when item not found', async () => {
      mockItemRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
      expect(mockItemRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['restaurant'],
      });
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const updateItemDto = {
        name: 'Updated Item',
        price: 19.99,
      };
      const updatedItem = { ...mockItem, ...updateItemDto };

      mockItemRepository.findOne.mockResolvedValue(mockItem);
      mockItemRepository.save.mockResolvedValue(updatedItem);

      const result = await service.update('1', updateItemDto);
      expect(result).toEqual(updatedItem);
    });

    it('should throw NotFoundException when item not found', async () => {
      mockItemRepository.findOne.mockResolvedValue(null);

      await expect(service.update('1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an item', async () => {
      mockItemRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('1');
      expect(mockItemRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when item not found', async () => {
      mockItemRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
