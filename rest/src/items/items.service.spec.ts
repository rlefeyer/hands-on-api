import {OrdersService} from "../orders/orders.service";
import {ItemsService} from "./items.service";

it("should return an array of items", async () => {
    const mockItemRepository = {
        find: jest.fn().mockResolvedValue([{
            "id": 2,
            "name": "MaxiBestOf",
            "description": "Le meilleur menu de chez McDo",
            "prix": 10,
        }, {
            "id": 3,
            "name": "MaxiMaxiBestOf",
            "description": "Le meilleur menu de chez McDo",
            "prix": 10,
        }]),
    };

    const itemsService = new ItemsService(mockItemRepository as any);

    const items = await itemsService.findAll();

    expect(items).toEqual([{
        "id": 2,
        "name": "MaxiBestOf",
        "description": "Le meilleur menu de chez McDo",
        "prix": 10,
    }, {
        "id": 3,
        "name": "MaxiMaxiBestOf",
        "description": "Le meilleur menu de chez McDo",
        "prix": 10,
    }]);
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
    const mockOrderRepository = {
        save: jest.fn().mockResolvedValue({
            "id": 2,
            "name": "MaxiBestOf",
            "description": "Le meilleur menu de chez McDo",
            "prix": 10,
        }),
    };

    const ordersService = new OrdersService(mockOrderRepository as any);

    const createOrderDto = {
        "id": 2,
        "name": "MaxiBestOf",
        "description": "Le meilleur menu de chez McDo",
        "prix": 10,
    };

    const newUser = await ordersService.create(createOrderDto as any);

    expect(newUser).toEqual({
        "id": 2,
        "name": "MaxiBestOf",
        "description": "Le meilleur menu de chez McDo",
        "prix": 10,
    });
    expect(mockOrderRepository.save).toHaveBeenCalledWith(createOrderDto);
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
