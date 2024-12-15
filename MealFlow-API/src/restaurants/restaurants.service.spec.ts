import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

const mockRestaurant = {
  id: 1,
  name: 'McDonald\'s',
  description: 'Fast food burgers and more',
  address: '1 Rue de Lille, Lille',
  menus: [],
  rating: 4.5,
  openingHours: 'Monday - Friday: 12 PM - 3 PM, 7 PM - 11 PM',
};

const mockRestaurantRepository = {
  create: jest.fn().mockImplementation(dto => dto),
  save: jest.fn().mockResolvedValue(mockRestaurant),
  find: jest.fn().mockResolvedValue([mockRestaurant]),
  findOne: jest.fn(({ where: { id } }) => 
    id === 1 ? Promise.resolve(mockRestaurant) : Promise.resolve(null),
  ),
  delete: jest.fn().mockResolvedValue({ affected: 1, raw: {} } as DeleteResult),
};

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let repository: Repository<Restaurant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        { provide: getRepositoryToken(Restaurant), useValue: mockRestaurantRepository },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    repository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new restaurant', async () => {
      const createRestaurantDto: CreateRestaurantDto = {
        name: 'McDonald\'s',
        description: 'Fast food burgers and more',
        address: '1 Rue de Lille, Lille',
      };

      const result = await service.create(createRestaurantDto);
      expect(repository.create).toHaveBeenCalledWith(createRestaurantDto);
      expect(repository.save).toHaveBeenCalledWith(createRestaurantDto);
      expect(result).toEqual(mockRestaurant);
    }); 
  });

  describe('findAll', () => {
    it('should return an array of restaurants', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockRestaurant]);
    }
  );
});

    

  describe('findOne', () => {
    it('should return a restaurant by ID', async () => {
      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockRestaurant);
    });

    it('should throw NotFoundException if the restaurant does not exist', async () => {
      await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the restaurant', async () => {
      const updateRestaurantDto: UpdateRestaurantDto = { name: 'KFC' };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockRestaurant);

      const result = await service.update(1, updateRestaurantDto);
      expect(repository.save).toHaveBeenCalledWith({
        ...mockRestaurant,
        ...updateRestaurantDto,
      });
      expect(result).toEqual(mockRestaurant);
    });
  });

  describe('remove', () => {
    it('should delete the restaurant', async () => {
      const result = await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if the restaurant does not exist', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValueOnce({
        affected: 0,
        raw: {},
      } as DeleteResult);

      await expect(service.remove(2)).rejects.toThrow(NotFoundException);
    });
  });
});
