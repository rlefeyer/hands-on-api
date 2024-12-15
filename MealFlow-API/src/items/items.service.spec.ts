import { NotFoundException } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { Repository, DeleteResult } from "typeorm";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Item } from "./entities/item.entity";
import { ItemsService } from "./items.service";


const mockItem = {
  id: 1,
  name: 'BigMac',
  restaurant: { id: 1, name: 'McDonalds', address: '123 Main St' },
};

const mockRepository = {
  create: jest.fn().mockImplementation(dto => dto),
  save: jest.fn().mockResolvedValue(mockItem),
  find: jest.fn().mockResolvedValue([mockItem]),
  findOne: jest.fn(({ where: { id } }) => {
    if (id === 1) return Promise.resolve(mockItem);
    return Promise.resolve(null);
  }),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('ItemsService', () => {
  let service: ItemsService;
  let itemRepository: Repository<Item>;
  let restaurantRepository: Repository<Restaurant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Restaurant),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<Repository<Item>>(getRepositoryToken(Item));
    restaurantRepository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new item', async () => {
      const createItemDto: CreateItemDto = {
        name: 'BigMac',
        price: 5.99,
        restaurantId: 1,
      };

      jest.spyOn(restaurantRepository, 'findOne').mockResolvedValueOnce(mockItem.restaurant);

      const result = await service.create(createItemDto);
      expect(restaurantRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(itemRepository.create).toHaveBeenCalledWith({
        name: 'BigMac',
        price: 5.99,
        restaurant: mockItem.restaurant,
      });
      expect(itemRepository.save).toHaveBeenCalledWith({
        name: 'BigMac',
        price: 5.99,
        restaurant: mockItem.restaurant,
      });
      expect(result).toEqual(mockItem);
    });

    it('should throw NotFoundException if the restaurant does not exist', async () => {
      jest.spyOn(restaurantRepository, 'findOne').mockResolvedValueOnce(null);

      const createItemDto: CreateItemDto = {
        name: 'BigMac',
        price: 5.99,
        restaurantId: 2,
      };

      await expect(service.create(createItemDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      const result = await service.findAll();
      expect(itemRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockItem]);
    });
  });

  describe('findOne', () => {
    it('should return an item if it exists', async () => {
      const result = await service.findOne(1);
      expect(itemRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockItem);
    });

    it('should throw NotFoundException if the item does not exist', async () => {
      jest.spyOn(itemRepository, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the updated item', async () => {
      const updateItemDto: UpdateItemDto = { name: 'BigMac Updated', price: 6.99 };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockItem);

      const result = await service.update(1, updateItemDto);
      expect(itemRepository.save).toHaveBeenCalledWith({
        ...mockItem,
        ...updateItemDto,
      });
      expect(result).toEqual(mockItem);
    });

    it('should throw NotFoundException if the item does not exist', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());

      const updateItemDto: UpdateItemDto = { name: 'BigMac Updated', price: 6.99 };

      await expect(service.update(2, updateItemDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete the item', async () => {
      jest.spyOn(itemRepository, 'delete').mockResolvedValueOnce({
        affected: 1,
        raw: {},
      } as DeleteResult);
  
      const result = await service.remove(1);
      expect(itemRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });
  
    it('should throw NotFoundException if the item does not exist', async () => {
      jest.spyOn(itemRepository, 'delete').mockResolvedValueOnce({
        affected: 0,
        raw: {}, 
      } as DeleteResult);
  
      await expect(service.remove(2)).rejects.toThrow(NotFoundException);
      expect(itemRepository.delete).toHaveBeenCalledWith(2);
    });
  });
  
});
