import { Test, TestingModule } from "@nestjs/testing";
import { MenusService } from "./menus.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Menu } from "./entities/menu.entity";
import { Repository } from "typeorm";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { Restaurant } from "../restaurants/entities/restaurant.entity";

describe("MenusService", () => {
  let service: MenusService;
  let repository: Repository<Menu>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenusService,
        {
          provide: getRepositoryToken(Menu),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MenusService>(MenusService);
    repository = module.get<Repository<Menu>>(getRepositoryToken(Menu));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a menu", async () => {
    const createMenuDto: CreateMenuDto = {
      name: "La merguez de l'espace",
      description: "La merguez de l'espace, un must have",
      price: 12.99,
      restaurant: new Restaurant(),
    };

    const menu = new Menu();
    Object.assign(menu, createMenuDto);

    jest.spyOn(repository, "create").mockReturnValue(menu);
    jest.spyOn(repository, "save").mockResolvedValue(menu);

    expect(await service.create(createMenuDto)).toEqual(menu);
  });

  it("should return all menus", async () => {
    const menus: Menu[] = [
      { id: 1, name: "La merguez de l'espace", description: "La merguez de l'espace, un must have", price: 12.99, restaurant: new Restaurant() },
    ];

    jest.spyOn(repository, "find").mockResolvedValue(menus);

    expect(await service.findAll()).toEqual(menus);
  });

  it("should return a menu by id", async () => {
    const menu: Menu = { id: 1, name: "La merguez de l'espace", description: "La merguez de l'espace, un must have", price: 12.99, restaurant: new Restaurant() };

    jest.spyOn(repository, "findOne").mockResolvedValue(menu);

    expect(await service.findOne(1)).toEqual(menu);
  });

  it("should update a menu", async () => {
    const updateMenuDto: UpdateMenuDto = { name: "La merguez de l'espace Updated" };
    const menu: Menu = { id: 1, name: "La merguez de l'espace", description: "La merguez de l'espace, un must have", price: 12.99, restaurant: new Restaurant() };

    jest.spyOn(repository, "update").mockResolvedValue(undefined);
    jest.spyOn(repository, "findOne").mockResolvedValue({ ...menu, ...updateMenuDto });

    expect(await service.update(1, updateMenuDto)).toEqual({ ...menu, ...updateMenuDto });
  });

  it("should remove a menu", async () => {
    jest.spyOn(repository, "delete").mockResolvedValue(undefined);

    await service.remove(1);

    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});