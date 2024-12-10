import {Test} from "@nestjs/testing";
import {OrdersService} from "./orders.service";

describe("OrdersService", () => {
    let ordersService: OrdersService;

    const orders = {
        id: 1,
        order: [
            {
                "id": "1",
                "name": "MaxiBestOf",
                "description": "Le meilleur menu de chez McDo",
                "prix": 10,
                "restaurant": "McDo",
            },
        ],
        prix: 10,
        user: {
            "name": "John",
            "adresse": "5 rue de la paix",
            "telephone": "0606060606",
        },
    };

    const mockOrderRepository = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        let module = await Test.createTestingModule({
            providers: [{
                provide: OrdersService,
                useValue: mockOrderRepository,
            }],
        }).compile();

        ordersService = module.get<OrdersService>(OrdersService);
    });

    it("should return a list of orders", async () => {
        jest.spyOn(ordersService, "findAll").mockResolvedValue([orders as any]);

        const items = await ordersService.findAll();

        expect(items).toEqual([orders]);
    });

    it("should return an order", async () => {
        const item = await ordersService.findOne(1);

        expect(item).toEqual(item);
        expect(ordersService.findOne).toHaveBeenCalledWith(1);
    });

    it("should create an item", async () => {
        jest.spyOn(ordersService, "create").mockResolvedValue(orders as any);

        const newItem = await ordersService.create(orders as any);

        expect(newItem).toEqual(orders);
        expect(ordersService.create).toHaveBeenCalledWith(orders);
    });

    it("should update an item", async () => {
        jest.spyOn(ordersService, "update").mockResolvedValue(orders as any);

        const updatedItem = await ordersService.update(1, orders as any);

        expect(updatedItem).toEqual(orders);
        expect(ordersService.update).toHaveBeenCalledWith(1, expect.objectContaining(orders));
    });

    it("should remove an item", async () => {
        jest.spyOn(ordersService, "remove").mockResolvedValue(true);

        const result = await ordersService.remove(1);

        expect(result).toBe(true);
        expect(ordersService.remove).toHaveBeenCalledWith(1);
    });
});