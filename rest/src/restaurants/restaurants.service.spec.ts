import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let repository: Repository<Restaurant>;

  const mockRestaurantRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    })),
  };

  const mockRestaurant: Restaurant = {
    id: '1',
    name: 'Test Restaurant',
    adresse: '123 Test Street',
    description: 'Test Description',
    items: [],
    note: 4.5,
    horaires: '9-22h',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: getRepositoryToken(Restaurant),
          useValue: mockRestaurantRepository,
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    repository = module.get<Repository<Restaurant>>(
      getRepositoryToken(Restaurant),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new restaurant', async () => {
      const createRestaurantDto = {
        name: 'Test Restaurant',
        adresse: '123 Test Street',
        description: 'Test Description',
        items: [],
        note: 4.5,
        horaires: '9-22h',
      };

      mockRestaurantRepository.create.mockReturnValue(mockRestaurant);
      mockRestaurantRepository.save.mockResolvedValue(mockRestaurant);

      const result = await service.create(createRestaurantDto);
      expect(result).toEqual(mockRestaurant);
      expect(mockRestaurantRepository.create).toHaveBeenCalledWith(
        createRestaurantDto,
      );
      expect(mockRestaurantRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all restaurants', async () => {
      mockRestaurantRepository
        .createQueryBuilder()
        .getMany.mockResolvedValue([mockRestaurant]);

      const result = await service.findAll();
      expect(result).toEqual([mockRestaurant]);
    });

    it('should filter restaurants by name', async () => {
      mockRestaurantRepository
        .createQueryBuilder()
        .getMany.mockResolvedValue([mockRestaurant]);

      await service.findAll('Test');
      expect(
        mockRestaurantRepository.createQueryBuilder().andWhere,
      ).toHaveBeenCalled();
    });

    it('should filter restaurants by address', async () => {
      mockRestaurantRepository
        .createQueryBuilder()
        .getMany.mockResolvedValue([mockRestaurant]);

      await service.findAll(undefined, 'Test Street');
      expect(
        mockRestaurantRepository.createQueryBuilder().andWhere,
      ).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a restaurant by id', async () => {
      mockRestaurantRepository.findOne.mockResolvedValue(mockRestaurant);

      const result = await service.findOne('1');
      expect(result).toEqual(mockRestaurant);
    });

    it('should throw NotFoundException when restaurant not found', async () => {
      mockRestaurantRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a restaurant', async () => {
      const updateRestaurantDto = {
        name: 'Updated Restaurant',
      };
      const updatedRestaurant = { ...mockRestaurant, ...updateRestaurantDto };

      mockRestaurantRepository.findOne.mockResolvedValue(mockRestaurant);
      mockRestaurantRepository.save.mockResolvedValue(updatedRestaurant);

      const result = await service.update('1', updateRestaurantDto);
      expect(result).toEqual(updatedRestaurant);
    });

    it('should throw NotFoundException when restaurant not found', async () => {
      mockRestaurantRepository.findOne.mockResolvedValue(null);

      await expect(service.update('1', {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a restaurant', async () => {
      mockRestaurantRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove('1');
      expect(mockRestaurantRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when restaurant not found', async () => {
      mockRestaurantRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('addRating', () => {
    it('should add rating to a restaurant with no rating', async () => {
      const restaurantWithNoRating = { ...mockRestaurant, note: 0 };
      const ratedRestaurant = { ...mockRestaurant, note: 4.5 };

      mockRestaurantRepository.findOne.mockResolvedValue(
        restaurantWithNoRating,
      );
      mockRestaurantRepository.save.mockResolvedValue(ratedRestaurant);

      const result = await service.addRating('1', 4.5);
      expect(result).toEqual(ratedRestaurant);
    });

    it('should throw error when restaurant already has rating', async () => {
      mockRestaurantRepository.findOne.mockResolvedValue(mockRestaurant);

      await expect(service.addRating('1', 4.5)).rejects.toThrow(
        'La note a déjà été ajoutée à ce restaurant.',
      );
    });
  });
});
