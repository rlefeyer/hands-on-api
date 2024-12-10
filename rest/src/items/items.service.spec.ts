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

    it("should return an array of items", async () => {
        jest.spyOn(itemsService, "findAll").mockResolvedValue([item as any]);

        const items = await itemsService.findAll();

        expect(items).toEqual([item]);
    });

    it("should return an item", async () => {
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

    it("should create an item", async () => {
        jest.spyOn(itemsService, "create").mockResolvedValue(item as any);

        const newItem = await itemsService.create(item as any);

        expect(newItem).toEqual(item);
        expect(itemsService.create).toHaveBeenCalledWith(item);
    });

    it("should update an item", async () => {
        jest.spyOn(itemsService, "update").mockResolvedValue(item as any);

        const updatedItem = await itemsService.update(1, item as any);

        expect(updatedItem).toEqual(item);
        expect(itemsService.update).toHaveBeenCalledWith(1, expect.objectContaining(item));
    });

    it("should remove an item", async () => {
        jest.spyOn(itemsService, "remove").mockResolvedValue(true);

        const result = await itemsService.remove(1);

        expect(result).toBe(true);
        expect(itemsService.remove).toHaveBeenCalledWith(1);
    });
});