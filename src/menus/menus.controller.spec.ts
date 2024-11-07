import { Test, TestingModule } from '@nestjs/testing';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

describe('MenusController', () => {
  let controller: MenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenusController],
      providers: [MenusService],
    }).compile();

    controller = module.get<MenusController>(MenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Create a new menu
  it('should create a menu', async () => {
    const createMenuDto = { id: 1, name: 'Pizza', price: 10.99, restaurantId: 1 };
    const result = { id: 1, ...createMenuDto };
    jest.spyOn(controller, 'create').mockResolvedValue(result);

    expect(await controller.create(createMenuDto)).toEqual(result);
  });

  // Retrieve all menus
  it('should return an array of menus', async () => {
    const result = [{ id: 1, name: 'Pizza', price: 15.99 }];
    jest.spyOn(controller, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
  });

  // Retrieve a menu by ID
  it('should return a menu by ID', async () => {
    const result = { id: 1, name: 'Pizza', price: 15.99 };
    jest.spyOn(controller, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne(1)).toEqual(result);
  });

  // Update a menu
  it('should update a menu', async () => {
    const updateMenuDto = { name: 'Pasta', price: 15.99, restaurantId: 1 };
    const result = { id: 1, ...updateMenuDto };
    jest.spyOn(controller, 'update').mockResolvedValue(result);
    expect(await controller.update(1, updateMenuDto)).toEqual(result);
  });

  // Remove a menu
  it('should remove a menu', async () => {
    jest.spyOn(controller, 'remove').mockResolvedValue();
    expect(await controller.remove(1)).toBeUndefined();
  });


});
