import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({
    status: 201,
    description: "The user has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Invalid data provided." })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all users" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved all users.",
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a single user by ID" })
  @ApiParam({ name: "id", description: "The ID of the user to retrieve" })
  @ApiResponse({ status: 200, description: "The user with the given ID." })
  @ApiResponse({ status: 404, description: "User not found." })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user by ID" })
  @ApiParam({ name: "id", description: "The ID of the user to update" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully updated.",
  })
  @ApiResponse({ status: 404, description: "User not found." })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user by ID" })
  @ApiParam({ name: "id", description: "The ID of the user to delete" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully removed.",
  })
  @ApiResponse({ status: 404, description: "User not found." })
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
