import {OrdersService} from "../orders/orders.service";
import {ItemsService} from "./items.service";
import {Test} from "@nestjs/testing";

describe("ItemsService", () => {
    let itemsService: ItemsService;

    const item = {
        id: 1,
        name: "MaxiBestOf",
        description: "Le meilleur menu de chez McDo",
        prix: 10,
    };

    const mockItemRepository = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        let module = await Test.createTestingModule({
            providers: [{
                provide: ItemsService,
                useValue: mockItemRepository,
            }],
        }).compile();

        itemsService = module.get<ItemsService>(ItemsService);
    });

    describe("findAll", () => {
        it("should return an array of items", async () => {

            jest.spyOn(itemsService, "findAll").mockResolvedValue([item as any]);

            const items = await itemsService.findAll();

            expect(items).toEqual([item]);
        });

    });

    it("should return a item", async () => {
        const mockItemRepository = {
            findOne: jest.fn().mockResolvedValue({
                "id": 2,
                "name": "MaxiBestOf",
                "description": "Le meilleur menu de chez McDo",
                "prix": 10,
            }),
        };

        const itemsService = new ItemsService(mockItemRepository as any);

        const item = await itemsService.findOne(1);

        expect(item).toEqual({
            "id": 2,
            "name": "MaxiBestOf",
            "description": "Le meilleur menu de chez McDo",
            "prix": 10,
        });
        expect(mockItemRepository.findOne).toHaveBeenCalledWith({where: {id: 1}});
    });

    it("should create a item", async () => {

        jest.spyOn(itemsService, "create").mockResolvedValue(item as any);

        const newItem = await itemsService.create(item as any);

        expect(newItem).toEqual(item);
        expect(itemsService.create).toHaveBeenCalledWith(item);
    });

    it("should update a item", async () => {
        const mockItemRepository = {
            update: jest.fn().mockResolvedValue({affected: 1}),
            findOne: jest.fn().mockResolvedValue({
                "id": 2,
                "name": "MaxiBestOf",
                "description": "Le meilleur menu de chez McDo",
                "prix": 10,
            }),
        };

        const itemsService = new ItemsService(mockItemRepository as any);

        const updateItemDto = {
            "id": 2,
            "name": "MaxiBestOf",
            "description": "Le meilleur menu de chez McDo",
            "prix": 10,
        };

        const updatedItem = await itemsService.update(1, updateItemDto as any);

        expect(updatedItem).toEqual({
            "id": 2,
            "name": "MaxiBestOf",
            "description": "Le meilleur menu de chez McDo",
            "prix": 10,
        });

        expect(mockItemRepository.update).toHaveBeenCalledWith(1, expect.objectContaining(updateItemDto));
        expect(mockItemRepository.findOne).toHaveBeenCalledWith({where: {id: 1}});
    });

    it("should remove a item", async () => {
        const mockItemRepository = {
            delete: jest.fn().mockResolvedValue({affected: 1}),
        };

        const itemsService = new ItemsService(mockItemRepository as any);

        const result = await itemsService.remove(1);

        expect(result).toBe(true);
        expect(mockItemRepository.delete).toHaveBeenCalledWith(1);
    });

    it("should return false if item is not deleted", async () => {
        const mockItemsRepository = {
            delete: jest.fn().mockResolvedValue({affected: 0}),
        };

        const userService = new ItemsService(mockItemsRepository as any);

        const result = await userService.remove(1);

        expect(result).toBe(false);
        expect(mockItemsRepository.delete).toHaveBeenCalledWith(1);
    });
});