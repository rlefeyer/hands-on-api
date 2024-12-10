import { Test, TestingModule } from "@nestjs/testing";
import { RestaurantsService } from "./restaurants.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Restaurant } from "./entities/restaurant.entity";
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";

describe("RestaurantsService", () => {
  let service: RestaurantsService;
  let repository: Repository<Restaurant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: getRepositoryToken(Restaurant),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    repository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a restaurant", async () => {
    const createRestaurantDto: CreateRestaurantDto = {
      name: "Magic Merguez",
      description: "Le meilleur restaurant de Merguez de Bordeaux",
      address: "322 rue Jacob",
      note: 5,
      horaires: "10h-22h",
      menus: [],
    };

    const restaurant = new Restaurant();
    Object.assign(restaurant, createRestaurantDto);

    jest.spyOn(repository, "create").mockReturnValue(restaurant);
    jest.spyOn(repository, "save").mockResolvedValue(restaurant);

    expect(await service.create(createRestaurantDto)).toEqual(restaurant);
  });

  it("should return all restaurants", async () => {
    const restaurants: Restaurant[] = [
      { id: 1, name: "Magic Merguez", description: "Le meilleur restaurant de Merguez de Bordeaux", address: "322 rue Jacob", note: 5, horaires: "10h-22h", menus: [] },
    ];

    jest.spyOn(repository, "find").mockResolvedValue(restaurants);

    expect(await service.findAll()).toEqual(restaurants);
  });

  it("should return a restaurant by id", async () => {
    const restaurant: Restaurant = { id: 1, name: "Magic Merguez", description: "Le meilleur restaurant de Merguez de Bordeaux", address: "322 rue Jacob", note: 5, horaires: "10h-22h", menus: [] };

    jest.spyOn(repository, "findOne").mockResolvedValue(restaurant);

    expect(await service.findOne(1)).toEqual(restaurant);
  });

  it("should update a restaurant", async () => {
    const updateRestaurantDto: UpdateRestaurantDto = { name: "Magic Merguez Updated" };
    const restaurant: Restaurant = { id: 1, name: "Magic Merguez", description: "Le meilleur restaurant de Merguez de Bordeaux", address: "322 rue Jacob", note: 5, horaires: "10h-22h", menus: [] };

    jest.spyOn(repository, "update").mockResolvedValue(undefined);
    jest.spyOn(repository, "findOne").mockResolvedValue({ ...restaurant, ...updateRestaurantDto });

    expect(await service.update(1, updateRestaurantDto)).toEqual({ ...restaurant, ...updateRestaurantDto });
  });

  it("should remove a restaurant", async () => {
    jest.spyOn(repository, "delete").mockResolvedValue(undefined);

    await service.remove(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});