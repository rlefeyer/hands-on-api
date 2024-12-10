import {RestaurantsService} from "./restaurants.service";

it("should return an array of restaurants", async () => {
    const mockUserRepository = {
        find: jest.fn().mockResolvedValue([{
            "name": "McDo",
            "description": "Le meilleur fast-food",
            "categorie": "fast-food",
            "adresse": "5 rue de la paix",
            "menu": [
                1,
                2,
            ],
            "note": 10,
            "horaires": "10h-22h",
        }, {
            "name": "KFC",
            "description": "Le meilleur fast-food",
            "categorie": "fast-food",
            "adresse": "5 rue de la paix",
            "menu": [
                1,
                2,
            ],
            "note": 10,
            "horaires": "10h-22h",
        }]),
    };

    const restaurantsService = new RestaurantsService(mockUserRepository as any);

    const restaurants = await restaurantsService.findAll(mockUserRepository);

    expect(restaurants).toEqual([{
        "name": "McDo",
        "description": "Le meilleur fast-food",
        "categorie": "fast-food",
        "adresse": "5 rue de la paix",
        "menu": [
            1,
            2,
        ],
        "note": 10,
        "horaires": "10h-22h",
    }, {
        "name": "KFC",
        "description": "Le meilleur fast-food",
        "categorie": "fast-food",
        "adresse": "5 rue de la paix",
        "menu": [
            1,
            2,
        ],
        "note": 10,
        "horaires": "10h-22h",
    }]);
});


it("should return a restaurant", async () => {
    const mockUserRepository = {
        findOne: jest.fn().mockResolvedValue({
            "name": "KFC",
            "description": "Le meilleur fast-food",
            "categorie": "fast-food",
            "adresse": "5 rue de la paix",
            "menu": [
                1,
                2,
            ],
            "note": 10,
            "horaires": "10h-22h",
        }),
    };

    const userService = new RestaurantsService(mockUserRepository as any);

    const user = await userService.findOne(1);

    expect(user).toEqual({
        "name": "KFC",
        "description": "Le meilleur fast-food",
        "categorie": "fast-food",
        "adresse": "5 rue de la paix",
        "menu": [
            1,
            2,
        ],
        "note": 10,
        "horaires": "10h-22h",
    });
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({where: {id: 1}});
});

it("should create a restaurant", async () => {
    const mockUserRepository = {
        save: jest.fn().mockResolvedValue({
            "name": "KFC",
            "description": "Le meilleur fast-food",
            "categorie": "fast-food",
            "adresse": "5 rue de la paix",
            "menu": [
                1,
                2,
            ],
            "note": 10,
            "horaires": "10h-22h",
        }),
    };

    const userService = new RestaurantsService(mockUserRepository as any);

    const createUserDto = {
        "name": "KFC",
        "description": "Le meilleur fast-food",
        "categorie": "fast-food",
        "adresse": "5 rue de la paix",
        "menu": [
            1,
            2,
        ],
        "note": 10,
        "horaires": "10h-22h",
    };

    const newUser = await userService.create(createUserDto as any);

    expect(newUser).toEqual({
        "name": "KFC",
        "description": "Le meilleur fast-food",
        "categorie": "fast-food",
        "adresse": "5 rue de la paix",
        "menu": [
            1,
            2,
        ],
        "note": 10,
        "horaires": "10h-22h",
    });
    expect(mockUserRepository.save).toHaveBeenCalledWith(createUserDto);
});

it("should update a restaurant", async () => {
    const mockUserRepository = {
        update: jest.fn().mockResolvedValue({affected: 1}),
        findOne: jest.fn().mockResolvedValue({
            "name": "Burger King",
            "description": "Le meilleur fast-food",
            "categorie": "fast-food",
            "adresse": "5 rue de la paix",
            "menu": [
                1,
                2,
            ],
            "note": 10,
            "horaires": "10h-22h",
        }),
    };

    const userService = new RestaurantsService(mockUserRepository as any);

    const updateUserDto = {
        "name": "Burger King",
        "description": "Le meilleur fast-food",
        "categorie": "fast-food",
        "adresse": "5 rue de la paix",
        "menu": [
            1,
            2,
        ],
        "note": 10,
        "horaires": "10h-22h",
    };

    const updatedUser = await userService.update(1, updateUserDto as any);

    expect(updatedUser).toEqual({
        "name": "Burger King",
        "description": "Le meilleur fast-food",
        "categorie": "fast-food",
        "adresse": "5 rue de la paix",
        "menu": [
            1,
            2,
        ],
        "note": 10,
        "horaires": "10h-22h",
    });

    expect(mockUserRepository.update).toHaveBeenCalledWith(1, expect.objectContaining(updateUserDto));
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({where: {id: 1}});
});

it("should remove a restaurant", async () => {
    const mockUserRepository = {
        delete: jest.fn().mockResolvedValue({affected: 1}),
    };

    const userService = new RestaurantsService(mockUserRepository as any);

    const result = await userService.remove(1);

    expect(result).toBe(true);
    expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
});

it("should return false if restaurant is not deleted", async () => {
    const mockUserRepository = {
        delete: jest.fn().mockResolvedValue({affected: 0}),
    };

    const userService = new RestaurantsService(mockUserRepository as any);

    const result = await userService.remove(1);

    expect(result).toBe(false);
    expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
});
