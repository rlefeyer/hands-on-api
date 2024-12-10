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

    it("should return an array of users", async () => {
        const mockUserRepository = {
            find: jest.fn().mockResolvedValue([{id: 1, name: "John Doe"}, {id: 2, name: "Paul Pruvost"}]),
        };

        const userService = new UserService(mockUserRepository as any);

        const users = await userService.findAll();

        expect(users).toEqual([{id: 1, name: "John Doe"}, {id: 2, name: "Paul Pruvost"}]);
    });


    it("should return a user", async () => {
        const mockUserRepository = {
            findOne: jest.fn().mockResolvedValue({id: 1, name: "John Doe"}),
        };

        const userService = new UserService(mockUserRepository as any);

        const user = await userService.findOne(1);

        expect(user).toEqual({id: 1, name: "John Doe"});
        expect(mockUserRepository.findOne).toHaveBeenCalledWith({where: {id: 1}});
    });

    describe("create", () => {

        it("should create a user", async () => {
            const mockUserRepository = {
                save: jest.fn().mockResolvedValue({id: 1, name: "John Doe"}),
            };

            const userService = new UserService(mockUserRepository as any);

            const newUser = await userService.create(user as any);

            expect(newUser).toEqual({id: 1, name: "John Doe"});
            expect(mockUserRepository.save).toHaveBeenCalledWith(user);
        });

    });

    it("should update a user", async () => {
        const mockUserRepository = {
            update: jest.fn().mockResolvedValue({affected: 1}),
            findOne: jest.fn().mockResolvedValue({id: 1, name: "John Updated"}),
        };

        const userService = new UserService(mockUserRepository as any);

        const updateUserDto = {
            name: "John Updated",
        };

        const updatedUser = await userService.update(1, updateUserDto as any);

        expect(updatedUser).toEqual({id: 1, name: "John Updated"});

        expect(mockUserRepository.update).toHaveBeenCalledWith(1, expect.objectContaining(updateUserDto));
        expect(mockUserRepository.findOne).toHaveBeenCalledWith({where: {id: 1}});
    });

    it("should remove a user", async () => {
        const mockUserRepository = {
            delete: jest.fn().mockResolvedValue({affected: 1}),
        };

        const userService = new UserService(mockUserRepository as any);

        const result = await userService.remove(1);

        expect(result).toBe(true);
        expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });

    it("should return false if user is not deleted", async () => {
        const mockUserRepository = {
            delete: jest.fn().mockResolvedValue({affected: 0}),
        };

        const userService = new UserService(mockUserRepository as any);

        const result = await userService.remove(1);

        expect(result).toBe(false);
        expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });
});
