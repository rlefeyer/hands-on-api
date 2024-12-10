import {RestaurantsService} from "./restaurants.service";
import {Test, TestingModule} from "@nestjs/testing";

describe("RestaurantsService", () => {
    let restaurantsService: RestaurantsService;

    const restaurant = {
        "id": 1,
        "name": "McDo",
        "description": "Le meilleur fast-food",
        "categorie": "fast-food",
        "adresse": "5 rue de la paix",
        "note": 10,
        "horaires": "10h-22h",
    }

    const mockRestaurantService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: RestaurantsService,
                useValue: mockRestaurantService,
            }],
        }).compile();

        restaurantsService = module.get<RestaurantsService>(RestaurantsService);
    });

    describe("findAll", () => {
        it("should return an array of restaurants", async () => {
            jest.spyOn(restaurantsService, "findAll").mockResolvedValue([restaurant as any]);

            const restaurants = await restaurantsService.findAll();

            expect(restaurants).toEqual([restaurant]);
        });
    });

    describe("findOne", () => {
        it("should return a restaurant", async () => {
            jest.spyOn(restaurantsService, "findOne").mockResolvedValue(restaurant as any);

            const restaurantReturn = await restaurantsService.findOne(1);

            expect(restaurantReturn).toEqual(restaurant);
            expect(restaurantsService.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe("create", () => {
        it("should create a restaurant", async () => {
            jest.spyOn(restaurantsService, "create").mockResolvedValue(restaurant as any);

            const newUser = await restaurantsService.create(restaurant as any);

            expect(newUser).toEqual(restaurant);
            expect(restaurantsService.create).toHaveBeenCalledWith(restaurant);
        });
    });

    describe("update", () => {
        it("should update a restaurant", async () => {

            restaurant.name = "Burger King";

            jest.spyOn(restaurantsService, "update").mockResolvedValue(restaurant as any);

            const updatedUser = await restaurantsService.update(1, restaurant as any);

            expect(updatedUser).toEqual(restaurant);

            expect(restaurantsService.update).toHaveBeenCalledWith(1, expect.objectContaining(restaurant));
            expect(restaurantsService.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe("remove", () => {
        it("should remove a restaurant", async () => {
            jest.spyOn(restaurantsService, "remove").mockResolvedValue(true);

            const result = await restaurantsService.remove(1);

            expect(result).toBe(true);
            expect(restaurantsService.remove).toHaveBeenCalledWith(1);
        });
    });
});