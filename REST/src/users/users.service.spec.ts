import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

describe("UsersService", () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a user", async () => {
    const createUserDto: CreateUserDto = {
      name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      age: 30,
      gender: "m",
      password: "Password@123",
    };

    const user = new User();
    Object.assign(user, createUserDto);

    jest.spyOn(repository, "create").mockReturnValue(user);
    jest.spyOn(repository, "save").mockResolvedValue(user);

    expect(await service.create(createUserDto)).toEqual(user);
  });

  it("should return all users", async () => {
    const users: User[] = [
      { id: "1", name: "John Doe", username: "johndoe", email: "john.doe@example.com", age: 30, gender: "m", password: "Password@123" },
    ];

    jest.spyOn(repository, "find").mockResolvedValue(users);

    expect(await service.findAll()).toEqual(users);
  });

  it("should return a user by id", async () => {
    const user: User = { id: "1", name: "John Doe", username: "johndoe", email: "john.doe@example.com", age: 30, gender: "m", password: "Password@123" };

    jest.spyOn(repository, "findOne").mockResolvedValue(user);

    expect(await service.findOne("1")).toEqual(user);
  });

  it("should update a user", async () => {
    const updateUserDto: UpdateUserDto = { name: "Jane Doe" };
    const user: User = { id: "1", name: "John Doe", username: "johndoe", email: "john.doe@example.com", age: 30, gender: "m", password: "Password@123" };

    jest.spyOn(repository, "update").mockResolvedValue(undefined);
    jest.spyOn(repository, "findOne").mockResolvedValue({ ...user, ...updateUserDto });

    expect(await service.update("1", updateUserDto)).toEqual({ ...user, ...updateUserDto });
  });

  it("should remove a user", async () => {
    jest.spyOn(repository, "delete").mockResolvedValue(undefined);

    await service.remove("1");

    expect(repository.delete).toHaveBeenCalledWith("1");
  });
});