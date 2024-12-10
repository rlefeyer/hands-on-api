import { Test, TestingModule } from "@nestjs/testing";
import { ItemsService } from "./items.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Item } from "./entities/item.entity";
import { Repository } from "typeorm";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Restaurant } from "../restaurants/entities/restaurant.entity";

describe("ItemsService", () => {
  let service: ItemsService;
  let repository: Repository<Item>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    repository = module.get<Repository<Item>>(getRepositoryToken(Item));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create an item", async () => {
    const createItemDto: CreateItemDto = {
      name: "La merguez de l'espace",
      description: "La merguez de l'espace, un must have",
      price: 12.99,
      restaurant: new Restaurant(),
    };

    const item = new Item();
    Object.assign(item, createItemDto);

    jest.spyOn(repository, "create").mockReturnValue(item);
    jest.spyOn(repository, "save").mockResolvedValue(item);

    expect(await service.create(createItemDto)).toEqual(item);
  });

  it("should return all items", async () => {
    const items: Item[] = [
      { id: 1, name: "La merguez de l'espace", description: "La merguez de l'espace, un must have", price: 12.99, restaurant: new Restaurant() },
    ];

    jest.spyOn(repository, "find").mockResolvedValue(items);

    expect(await service.findAll()).toEqual(items);
  });

  it("should return an item by id", async () => {
    const item: Item = { id: 1, name: "La merguez de l'espace", description: "La merguez de l'espace, un must have", price: 12.99, restaurant: new Restaurant() };

    jest.spyOn(repository, "findOne").mockResolvedValue(item);

    expect(await service.findOne(1)).toEqual(item);
  });

  it("should update an item", async () => {
    const updateItemDto: UpdateItemDto = { name: "La merguez de l'espace Updated" };
    const item: Item = { id: 1, name: "La merguez de l'espace", description: "La merguez de l'espace, un must have", price: 12.99, restaurant: new Restaurant() };

    jest.spyOn(repository, "update").mockResolvedValue(undefined);
    jest.spyOn(repository, "findOne").mockResolvedValue({ ...item, ...updateItemDto });

    expect(await service.update(1, updateItemDto)).toEqual({ ...item, ...updateItemDto });
  });

  it("should remove an item", async () => {
    jest.spyOn(repository, "delete").mockResolvedValue(undefined);

    await service.remove(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});