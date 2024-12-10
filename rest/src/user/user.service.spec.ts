import {UserService} from "./user.service";
import {User} from "./entities/user.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {UserController} from "./user.controller";

describe("UserService", () => {
    let userService: UserService;

    const user: User = {
        id: 1,
        name: "John Doe",
        adresse: "5 rue de la paix",
        telephone: "0606060606",
    }

    const mockUserService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [{
                provide: UserService,
                useValue: mockUserService,
            }],
        }).compile();

        userService = module.get<UserService>(UserService);
    });

    describe("findAll", () => {
        it("should return an array of users", async () => {
            jest.spyOn(userService, "findAll").mockResolvedValue([user]);

            const users = await userService.findAll();

            expect(users).toEqual([user]);
        });
    });

    describe("findOne", () => {
        it("should return a user", async () => {
            jest.spyOn(userService, "findOne").mockResolvedValue(user);

            const userTest = await userService.findOne(1);

            expect(userTest).toEqual(user);
            expect(userService.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe("create", () => {

        it("should create a user", async () => {
            jest.spyOn(userService, "create").mockResolvedValue(user);

            const newUser = await userService.create(user as any);

            expect(newUser).toEqual(user);
            expect(userService.create).toHaveBeenCalledWith(user);
        });

    });

    describe("update", () => {
        it("should update a user", async () => {
            user.name = "John Updated";

            jest.spyOn(userService, "update").mockResolvedValue(user);

            const updatedUser = await userService.update(1, user as any);

            expect(updatedUser).toEqual(user);

            expect(userService.update).toHaveBeenCalledWith(1, expect.objectContaining(user));
            expect(userService.findOne).toHaveBeenCalledWith(1);
        });
    });

    describe("remove", () => {
        it("should remove a user", async () => {
            jest.spyOn(userService, "remove").mockResolvedValue(true);

            const result = await userService.remove(1);

            expect(result).toBe(true);
            expect(userService.remove).toHaveBeenCalledWith(1);
        });
    });
});
