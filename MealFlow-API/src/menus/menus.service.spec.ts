import { Test, TestingModule } from '@nestjs/testing';
import { MenusService } from './menus.service';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

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

const mockRepository = {
  create: jest.fn().mockImplementation(dto => dto),
  save: jest.fn().mockResolvedValue(mockMenu),
  find: jest.fn().mockResolvedValue([mockMenu]),
  findOne: jest.fn().mockImplementation(({ where: { id } }) => {
    if (id === 1) {
      return Promise.resolve(mockMenu);
    }
    return Promise.resolve(null);
  }),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
};

describe('MenusService', () => {
  let service: MenusService;
  let repository: Repository<Menu>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenusService,
        {
          provide: getRepositoryToken(Menu),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MenusService>(MenusService);
    repository = module.get<Repository<Menu>>(getRepositoryToken(Menu));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a menu', async () => {
      const createMenuDto: CreateMenuDto = {
        name: 'BigMac',
        description: 'Delicious BigMac burger',
        price: 5.99,
        restaurantId: 1,
      };
      const result = await service.create(createMenuDto);
      expect(repository.create).toHaveBeenCalledWith(createMenuDto);
      expect(repository.save).toHaveBeenCalledWith(createMenuDto);
      expect(result).toEqual(mockMenu);
    });
  });

  describe('findAll', () => {
    it('should return an array of menus', async () => {
      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockMenu]);
    });
  });

  describe('findOne', () => {
    it('should return a menu if found', async () => {
      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockMenu);
    });

    it('should throw a NotFoundException if the menu is not found', async () => {
      await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the menu', async () => {
      const updateMenuDto: UpdateMenuDto = {
        name: 'BigMac Updated',
        price: 6.99,
        restaurantId: 1
      };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockMenu);

      const result = await service.update(1, updateMenuDto);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(repository.save).toHaveBeenCalledWith({ ...mockMenu, ...updateMenuDto });
      expect(result).toEqual(mockMenu);
    });
  });

  describe('remove', () => {
    it('should delete the menu', async () => {
      const result = await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
      expect(result).toBeUndefined();
    });

    it('should throw a NotFoundException if the menu is not found', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValueOnce({
          affected: 0, 
          raw: {}, 
        } as DeleteResult);
      
        await expect(service.remove(2)).rejects.toThrow(NotFoundException);
      });
      
  });
});
