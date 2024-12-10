import { Test, TestingModule } from '@nestjs/testing';
import { Ordersv2Service } from './ordersv2.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ordersv2 } from './entities/ordersv2.entity';
import { NotFoundException } from '@nestjs/common';

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('Ordersv2Service', () => {
  let service: Ordersv2Service;
  let repository: Repository<Ordersv2>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Ordersv2Service,
        {
          provide: getRepositoryToken(Ordersv2),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<Ordersv2Service>(Ordersv2Service);
    repository = module.get<Repository<Ordersv2>>(getRepositoryToken(Ordersv2));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new order', async () => {
      const dto = { itemIds: [1, 2], totalPrice: 50, userId: 1 };
      const order = { id: 1, ...dto };

      mockRepository.create.mockReturnValue(order);
      mockRepository.save.mockResolvedValue(order);

      const result = await service.create(dto as any);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(order);
      expect(result).toEqual(order);
    });
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const orders = [{ id: 1, totalPrice: 50 }, { id: 2, totalPrice: 70 }];
      mockRepository.find.mockResolvedValue(orders);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({ relations: ['items'] });
      expect(result).toEqual(orders);
    });
  });

  describe('findOne', () => {
    it('should return an order if found', async () => {
      const order = { id: 1, totalPrice: 50 };
      mockRepository.findOne.mockResolvedValue(order);

      const result = await service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['items'],
      });
      expect(result).toEqual(order);
    });

    it('should throw NotFoundException if order not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException(`Commande avec l'ID 1 non trouvée.`),
      );
    });
  });

  describe('update', () => {
    it('should update and return the updated order', async () => {
      const existingOrder = { id: 1, totalPrice: 50 };
      const updateDto = { totalPrice: 60 };

      mockRepository.findOne.mockResolvedValue(existingOrder);
      mockRepository.update.mockResolvedValue(null);
      mockRepository.findOne.mockResolvedValue({ ...existingOrder, ...updateDto });

      const result = await service.update(1, updateDto as any);

      expect(mockRepository.update).toHaveBeenCalledWith(1, {
        ...existingOrder,
        ...updateDto,
      });
      expect(result).toEqual({ ...existingOrder, ...updateDto });
    });
  });

  describe('remove', () => {
    it('should remove an order', async () => {
      const order = { id: 1, totalPrice: 50 };
      mockRepository.findOne.mockResolvedValue(order);

      await service.remove(1);

      expect(mockRepository.remove).toHaveBeenCalledWith(order);
    });
  });
});
