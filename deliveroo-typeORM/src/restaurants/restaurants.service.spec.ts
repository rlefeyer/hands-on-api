import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { NotFoundException } from '@nestjs/common';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let repository: Repository<Restaurant>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        { provide: getRepositoryToken(Restaurant), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    repository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a restaurant', async () => {
      const createDto = {
        name: 'Le Gourmet',
        description: 'Un restaurant gastronomique au cœur de la ville',
        address: '123 Rue de Paris, 75001 Paris',
        category: 'Gastronomie française',
        rating: 4.5,
        hours: '10:00 - 22:00',
      };
      const newRestaurant = { id: 1, ...createDto };

      mockRepository.create.mockReturnValue(newRestaurant);
      mockRepository.save.mockResolvedValue(newRestaurant);

      expect(await service.create(createDto)).toEqual(newRestaurant);
      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(newRestaurant);
    });
  });

  describe('findAll', () => {
    it('should return an array of restaurants', async () => {
      const restaurants = [
        {
          id: 1,
          name: 'Le Gourmet',
          description: 'Un restaurant gastronomique au cœur de la ville',
          address: '123 Rue de Paris, 75001 Paris',
          category: 'Gastronomie française',
          rating: 4.5,
          hours: '10:00 - 22:00',
        },
      ];
      mockRepository.find.mockResolvedValue(restaurants);

      expect(await service.findAll()).toEqual(restaurants);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a restaurant if found', async () => {
      const restaurant = {
        id: 1,
        name: 'Le Gourmet',
        description: 'Un restaurant gastronomique au cœur de la ville',
        address: '123 Rue de Paris, 75001 Paris',
        category: 'Gastronomie française',
        rating: 4.5,
        hours: '10:00 - 22:00',
      };
      mockRepository.findOneBy.mockResolvedValue(restaurant);

      expect(await service.findOne(1)).toEqual(restaurant);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if no restaurant is found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a restaurant', async () => {
      const restaurant = {
        id: 1,
        name: 'Le Gourmet',
        description: 'Un restaurant gastronomique au cœur de la ville',
        address: '123 Rue de Paris, 75001 Paris',
        category: 'Gastronomie française',
        rating: 4.5,
        hours: '10:00 - 22:00',
      };
      const updateDto = { name: 'Updated Name' };
      const updatedRestaurant = { ...restaurant, ...updateDto };

      mockRepository.findOneBy.mockResolvedValue(restaurant);
      mockRepository.update.mockResolvedValue(undefined);
      mockRepository.findOneBy.mockResolvedValue(updatedRestaurant);

      expect(await service.update(1, updateDto)).toEqual(updatedRestaurant);
      expect(mockRepository.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a restaurant', async () => {
      const restaurant = {
        id: 1,
        name: 'Le Gourmet',
        description: 'Un restaurant gastronomique au cœur de la ville',
        address: '123 Rue de Paris, 75001 Paris',
        category: 'Gastronomie française',
        rating: 4.5,
        hours: '10:00 - 22:00',
      };

      mockRepository.findOneBy.mockResolvedValue(restaurant);
      mockRepository.remove.mockResolvedValue(undefined);

      expect(await service.remove(1)).toBeUndefined();
      expect(mockRepository.remove).toHaveBeenCalledWith(restaurant);
    });
  });
});
