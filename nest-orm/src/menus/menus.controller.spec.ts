import { Test, TestingModule } from '@nestjs/testing';
import { MenusController} from "./menus.controller";
import { MenusService} from "./menus.service";
import { CreateMenuDto} from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";

const mockMenuService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

describe('MenusController', () => {
    let controller: MenusController;
    let service: MenusService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MenusController],
            providers: [{ provide: MenusService, useValue: mockMenuService }],
        }).compile();

        controller = module.get<MenusController>(MenusController);
        service = module.get<MenusService>(MenusService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a menu', async () => {
            const createMenuDto: CreateMenuDto = {
                name: 'John Doe',
                description: 'Description menu 1',
                price: '10',
                restaurant: 'johndoe',
            };
            mockMenuService.create.mockResolvedValue(createMenuDto);
            const result = await controller.create(createMenuDto);
            expect(result).toEqual(createMenuDto);
            expect(mockMenuService.create).toHaveBeenCalledWith(createMenuDto);
        });
    });

    describe('findAll', () => {
        it('should return all menus', async () => {
            const menus = [{ id: 1, name: 'John Doe' }];
            mockMenuService.findAll.mockResolvedValue(menus);

            const result = await controller.findAll();
            expect(result).toEqual(menus);
            expect(mockMenuService.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return one menu', async () => {
            const menu = { id: 1, name: 'John Doe' };
            mockMenuService.findOne.mockResolvedValue(menu);

            const result = await controller.findOne('1');
            expect(result).toEqual(menu);
            expect(mockMenuService.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should update a menu', async () => {
            const updateMenuDto: UpdateMenuDto = {
                name: 'John Updated',
                description: 'Description menu Updated',
                price: '12',
                restaurant: 'johndoeUpdated',
            };
            const updatedMenu = { id: 1, ...updateMenuDto };
            mockMenuService.update.mockResolvedValue(updatedMenu);

            const result = await controller.update('1', updateMenuDto);
            expect(result).toEqual(updatedMenu);
            expect(mockMenuService.update).toHaveBeenCalledWith(1, updateMenuDto);
        });
    });

    describe('remove', () => {
        it('should remove a menu', async () => {
            mockMenuService.remove.mockResolvedValue({ message: 'Menu deleted' });

            const result = await controller.remove('1');
            expect(result).toEqual({ message: 'Menu deleted' });
            expect(mockMenuService.remove).toHaveBeenCalledWith(1);
        });
    });
});
