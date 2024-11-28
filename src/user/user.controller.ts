import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./entities/user.entity";

@ApiTags("Users")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    @ApiResponse({status: 201, description: "The record has been successfully created."})
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    @ApiResponse({status: 200, description: "The records has been successfully returned.", type: [User]})
    findAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    @ApiResponse({status: 200, description: "The record has been successfully returned.", type: User})
    findOne(@Param("id") id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(":id")
    @ApiResponse({status: 200, description: "The record has been successfully updated.", type: User})
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(":id")
    @ApiResponse({status: 200, description: "The record has been successfully deleted."})
    @ApiResponse({status: 403, description: "Forbidden."})
    @ApiResponse({status: 404, description: "Not Found."})
    remove(@Param("id") id: string) {
        return this.userService.remove(+id);
    }
}
