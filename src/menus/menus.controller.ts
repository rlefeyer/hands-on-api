import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiResponse({
    status: 201,
    description: 'The menu item has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all menu items' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all menu items.',
  })
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a menu item by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the menu item to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'The menu item with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Menu item not found.' })
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a menu item by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the menu item to update' })
  @ApiResponse({
    status: 200,
    description: 'The menu item has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Menu item not found.' })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu item by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the menu item to delete' })
  @ApiResponse({
    status: 200,
    description: 'The menu item has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Menu item not found.' })
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
