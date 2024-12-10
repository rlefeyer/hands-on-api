import { Test, TestingModule } from '@nestjs/testing';
import { Ordersv2Controller } from './ordersv2.controller';
import { Ordersv2Service } from './ordersv2.service';

const mockService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  findItems: jest.fn(),
};

describe('Ordersv2Controller', () => {
  let controller: Ordersv2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Ordersv2Controller],
      providers: [
        {
          provide: Ordersv2Service,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<Ordersv2Controller>(Ordersv2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct parameters', async () => {
      const dto = { itemIds: [1, 2], totalPrice: 50, userId: 1 };
      const result = { id: 1, ...dto };

      mockService.create.mockResolvedValue(result);

      expect(await controller.create(dto as any)).toEqual(result);
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      const result = [{ id: 1, totalPrice: 50 }];
      mockService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single order', async () => {
      const result = { id: 1, totalPrice: 50 };
      mockService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update and return the updated order', async () => {
      const result = { id: 1, totalPrice: 60 };
      const updateDto = { totalPrice: 60 };

      mockService.update.mockResolvedValue(result);

      expect(await controller.update('1', updateDto as any)).toEqual(result);
      expect(mockService.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should call service.remove with correct parameters', async () => {
      await controller.remove('1');
      expect(mockService.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('findItems', () => {
    it('should return items of a specific order', async () => {
      const items = [{ id: 1, name: 'Item 1' }];
      mockService.findItems.mockResolvedValue(items);

      expect(await controller.findItems('1')).toEqual(items);
      expect(mockService.findItems).toHaveBeenCalledWith(1);
    });
  });
});
