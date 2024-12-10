import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController} from "./orders.controller";
import { OrdersService } from "./orders.service";
import { CreateOrderDto} from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

// Mock du service RestaurantsService
const mockOrderService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

describe('OrdersController', () => {
    let controller: OrdersController;
    let service: OrdersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [{ provide: OrdersService, useValue: mockOrderService }],
        }).compile();

        controller = module.get<OrdersController>(OrdersController);
        service = module.get<OrdersService>(OrdersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a order', async () => {
            const createOrderDto: CreateOrderDto = {
                name: 'John Doe',
                menus: ['menu1', 'menu2'],
                price: '10',
                user: 'johndoe',
            };
            mockOrderService.create.mockResolvedValue(createOrderDto);
            const result = await controller.create(createOrderDto);
            expect(result).toEqual(createOrderDto);
            expect(mockOrderService.create).toHaveBeenCalledWith(createOrderDto);
        });
    });

    describe('findAll', () => {
        it('should return all orders', async () => {
            const orders = [{ id: 1, name: 'John Doe' }];
            mockOrderService.findAll.mockResolvedValue(orders);

            const result = await controller.findAll();
            expect(result).toEqual(orders);
            expect(mockOrderService.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return one order', async () => {
            const order = { id: 1, name: 'John Doe' };
            mockOrderService.findOne.mockResolvedValue(order);

            const result = await controller.findOne('1');
            expect(result).toEqual(order);
            expect(mockOrderService.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe('update', () => {
        it('should update a order', async () => {
            const updateOrderDto: UpdateOrderDto = {
                name: 'John Updated',
                menus: ['menu1', 'menu2'],
                price: '10',
            };
            const updatedOrder = { id: 1, ...updateOrderDto };
            mockOrderService.update.mockResolvedValue(updatedOrder);

            const result = await controller.update('1', updateOrderDto);
            expect(result).toEqual(updatedOrder);
            expect(mockOrderService.update).toHaveBeenCalledWith(1, updateOrderDto);
        });
    });

    describe('remove', () => {
        it('should remove a order', async () => {
            mockOrderService.remove.mockResolvedValue({ message: 'Order deleted' });

            const result = await controller.remove('1');
            expect(result).toEqual({ message: 'Order deleted' });
            expect(mockOrderService.remove).toHaveBeenCalledWith(1);
        });
    });
});
