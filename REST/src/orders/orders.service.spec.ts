import { Test, TestingModule } from "@nestjs/testing";
import { OrdersService } from "./orders.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { User } from "../users/entities/user.entity";
import { Menu } from "../menus/entities/menu.entity";

describe("OrdersService", () => {
  let service: OrdersService;
  let repository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create an order", async () => {
    const createOrderDto: CreateOrderDto = {
      price: 42,
      user: new User(),
      menu: [new Menu()],
    };

    const order = new Order();
    Object.assign(order, createOrderDto);

    jest.spyOn(repository, "create").mockReturnValue(order);
    jest.spyOn(repository, "save").mockResolvedValue(order);

    expect(await service.create(createOrderDto)).toEqual(order);
  });

  it("should return all orders", async () => {
    const orders: Order[] = [
      { id: "1", price: 42, user: new User(), menus: [new Menu()] },
    ];

    jest.spyOn(repository, "find").mockResolvedValue(orders);

    expect(await service.findAll()).toEqual(orders);
  });

  it("should return an order by id", async () => {
    const order: Order = { id: "1", price: 42, user: new User(), menus: [new Menu()] };

    jest.spyOn(repository, "findOne").mockResolvedValue(order);

    expect(await service.findOne("1")).toEqual(order);
  });

  it("should update an order", async () => {
    const updateOrderDto: UpdateOrderDto = { price: 50 };
    const order: Order = { id: "1", price: 42, user: new User(), menus: [new Menu()] };

    jest.spyOn(repository, "update").mockResolvedValue(undefined);
    jest.spyOn(repository, "findOne").mockResolvedValue({ ...order, ...updateOrderDto });

    expect(await service.update("1", updateOrderDto)).toEqual({ ...order, ...updateOrderDto });
  });

  it("should remove an order", async () => {
    jest.spyOn(repository, "delete").mockResolvedValue(undefined);

    await service.remove("1");

    expect(repository.delete).toHaveBeenCalledWith("1");
  });
});