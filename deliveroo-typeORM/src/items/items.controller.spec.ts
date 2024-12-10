import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

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

  const mockItemsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new item', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockItem);

      const createItemDto = {
        name: 'Pizza Margherita',
        description: 'Une délicieuse pizza garnie de tomates fraîches et de mozzarella',
        price: 12.99,
        quantity: 5,
        restaurantId: 1,
      };

      expect(await controller.create(createItemDto)).toEqual(mockItem);
      expect(service.create).toHaveBeenCalledWith(createItemDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockItem]);

      expect(await controller.findAll()).toEqual([mockItem]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single item by ID', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockItem);

      expect(await controller.findOne('1')).toEqual(mockItem);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw an error if the item is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(
        new Error('Item avec l\'ID 1 non trouvé.'),
      );

      await expect(controller.findOne('1')).rejects.toThrow(
        'Item avec l\'ID 1 non trouvé.',
      );
      expect(service.findOne).toHaveBeenCalledWith(1);
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

      const updatedItem = { ...mockItem, ...updateItemDto };

      jest.spyOn(service, 'update').mockResolvedValue(updatedItem);

      expect(await controller.update('1', updateItemDto)).toEqual(updatedItem);
      expect(service.update).toHaveBeenCalledWith(1, updateItemDto);
    });
  });

  describe('remove', () => {
    it('should remove an item by ID', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
