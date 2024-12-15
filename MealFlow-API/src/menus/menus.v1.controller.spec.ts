import { Test, TestingModule } from '@nestjs/testing';
import { MenusControllev1 } from './menus.v1.controller';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { NotFoundException } from '@nestjs/common';

const mockMenu = {
  id: 1,
  name: 'BigMac',
  description: 'Delicious BigMac burger',
  price: 5.99,
  restaurant: {
    id: 1,
    name: 'McDonalds',
    address: '123 Main St',
  },
};

const mockMenusService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('MenusControllerV1', () => {
  let controller: MenusControllev1;
  let service: MenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenusControllev1],
      providers: [
        {
          provide: MenusService,
          useValue: mockMenusService,
        },
      ],
    }).compile();

    controller = module.get<MenusControllev1>(MenusControllev1);
    service = module.get<MenusService>(MenusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a menu', async () => {
      const createMenuDto: CreateMenuDto = {
        name: 'BigMac',
        description: 'Delicious BigMac burger',
        price: 5.99,
        restaurantId: 1,
      };
      mockMenusService.create.mockResolvedValue(mockMenu);

      const result = await controller.create(createMenuDto);
      expect(service.create).toHaveBeenCalledWith(createMenuDto);
      expect(result).toEqual(mockMenu);
    });
  });

  describe('findAll', () => {
    it('should return an array of menus', async () => {
      mockMenusService.findAll.mockResolvedValue([mockMenu]);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockMenu]);
    });
  });

  describe('findOne', () => {
    it('should return a menu if found', async () => {
      mockMenusService.findOne.mockResolvedValue(mockMenu);

      const result = await controller.findOne(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockMenu);
    });

    it('should throw a NotFoundException if the menu is not found', async () => {
      mockMenusService.findOne.mockRejectedValue(new NotFoundException('Menu not found'));

      await expect(controller.findOne(2)).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledWith(2);
    });
  });

  describe('update', () => {
    it('should update a menu', async () => {
      const updateMenuDto: UpdateMenuDto = {
        name: 'BigMac Updated',
        price: 6.99,
        restaurantId: 1,
      };
      mockMenusService.update.mockResolvedValue({ ...mockMenu, ...updateMenuDto });

      const result = await controller.update(1, updateMenuDto);
      expect(service.update).toHaveBeenCalledWith(1, updateMenuDto);
      expect(result).toEqual({ ...mockMenu, ...updateMenuDto });
    });
  });

  describe('remove', () => {
    it('should delete a menu', async () => {
      mockMenusService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw a NotFoundException if the menu is not found', async () => {
      mockMenusService.remove.mockRejectedValue(new NotFoundException('Menu not found'));

      await expect(controller.remove(2)).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledWith(2);
    });
  });
});
