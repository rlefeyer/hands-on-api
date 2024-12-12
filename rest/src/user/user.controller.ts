import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./entities/user.entity";
import {ThrottlerGuard} from "@nestjs/throttler";
import {Roles} from "./roles.decorator";
import {Role} from "./entities/role.enum";

@ApiTags("Users")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Roles(Role.Admin)
    @UseGuards(ThrottlerGuard)
    @Post()
    @ApiResponse({status: 201, description: "The record has been successfully created."})
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Roles(Role.Admin)
    @UseGuards(ThrottlerGuard)
    @Get()
    @ApiResponse({status: 200, description: "The records has been successfully returned.", type: [User]})
    findAll() {
        return this.userService.findAll();
    }

    @Roles(Role.Admin)
    @UseGuards(ThrottlerGuard)
    @Get(":id")
    @ApiResponse({status: 200, description: "The record has been successfully returned.", type: User})
    findOne(@Param("id") id: number) {
        return this.userService.findOne(id);
    }

    @Roles(Role.Admin)
    @UseGuards(ThrottlerGuard)
    @Patch(":id")
    @ApiResponse({status: 200, description: "The record has been successfully updated.", type: User})
    update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Roles(Role.Admin)
    @UseGuards(ThrottlerGuard)
    @Delete(":id")
    @ApiResponse({status: 200, description: "The record has been successfully deleted."})
    @ApiResponse({status: 403, description: "Forbidden."})
    @ApiResponse({status: 404, description: "Not Found."})
    remove(@Param("id") id: number) {
        return this.userService.remove(id);
    }
}
