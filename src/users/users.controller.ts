import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({status: 201, description: 'User created successfully'})
  @ApiOperation({summary: 'Create a new user'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({description: 'All users returned successfully'})
  @ApiOperation({summary: 'Get all users'})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({description: 'User returned successfully'})
    @ApiOperation({summary: 'Get user by id'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({description: 'User updated successfully'})
  @ApiOperation({summary: 'Update user by id'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'User deleted successfully'})
  @ApiOperation({summary: 'Delete user by id'})
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
