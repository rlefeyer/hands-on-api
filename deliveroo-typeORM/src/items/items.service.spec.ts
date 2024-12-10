import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { NotFoundException } from '@nestjs/common';

describe('ItemsService', () => {
  let service: ItemsService;
  let repository: Repository<Item>;

  const mockItem: Item = {
    id: 1,
    name: 'Pizza Margherita',
    description: 'Une délicieuse pizza garnie de tomates fraîches et de mozzarella',
    price: 12.99,
    quantity: 5,
    restaurantId: 1,
    restaurant: {
      id: 1,
      name: 'Le Gourmet',
      address: '123 Rue de Paris',
      description: 'Un restaurant gastronomique',
      category: 'Gastronomie',
      rating: 4.5,
      hours: '10:00 - 22:00',
      items: [],
    },
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockItem),
    save: jest.fn().mockResolvedValue(mockItem),
    find: jest.fn().mockResolvedValue([mockItem]),
    findOne: jest.fn(), // Mock explicite de findOne
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockRepository,
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
        name: 'Pizza Margherita',
        description: 'Une délicieuse pizza garnie de tomates fraîches et de mozzarella',
        price: 12.99,
        quantity: 5,
        restaurantId: 1,
      };

      const result = await service.create(createItemDto);
      expect(repository.create).toHaveBeenCalledWith(createItemDto);
      expect(repository.save).toHaveBeenCalledWith(mockItem);
      expect(result).toEqual(mockItem);
    });
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['restaurant'],
      });
      expect(result).toEqual([mockItem]);
    });
  });

  describe('findOne', () => {
    it('should return an item by ID', async () => {
      mockRepository.findOne.mockResolvedValue(mockItem);

      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['restaurant'],
      });
      expect(result).toEqual(mockItem);
    });

    it('should throw a NotFoundException if item is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException(`Item avec l'ID 1 non trouvé.`),
      );
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const updateItemDto = {
        name: 'Pizza Quattro Stagioni',
        description: 'Une pizza avec quatre sections, chacune représentant une saison',
        price: 14.99,
        quantity: 3,
      };
  
      const updatedItem = {
        ...mockItem,
        ...updateItemDto,
      };
  
      mockRepository.findOne
        .mockResolvedValueOnce(mockItem)
        .mockResolvedValueOnce(updatedItem);
  
      mockRepository.update.mockResolvedValue(undefined);
  
      const result = await service.update(1, updateItemDto);
  
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['restaurant'],
      });
      expect(repository.update).toHaveBeenCalledWith(1, updatedItem);
      expect(result).toEqual(updatedItem);
    });
  });
  

  describe('remove', () => {
    it('should remove an item', async () => {
      mockRepository.findOne.mockResolvedValue(mockItem);

      await service.remove(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['restaurant'],
      });
      expect(repository.remove).toHaveBeenCalledWith(mockItem);
    });

    it('should throw a NotFoundException if item to remove is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException(`Item avec l'ID 1 non trouvé.`),
      );
    });
  });
});
