import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('menus')
@ApiTags('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  // Create a new menu
  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiBody({ description: 'The information needed to create a menu', type: CreateMenuDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The menu has been successfully created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The provided data is invalid.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  // Retrieve all menus
  @Get()
  @ApiOperation({ summary: 'Retrieve all menus' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The menus have been successfully retrieved.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  findAll() {
    return this.menusService.findAll();
  }

  // Retrieve a menu by ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a menu by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The menu has been successfully retrieved.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Menu not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  findOne(@Param('id') id: number) {
    return this.menusService.findOne(id);
  }

  // Update a menu by ID
  @Patch(':id')
  @ApiOperation({ summary: 'Update a menu by ID' })
  @ApiBody({ description: 'The information needed to update a menu', type: UpdateMenuDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'The menu has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Menu not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The provided data is invalid.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  update(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  // Delete a menu by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu by ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The menu has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Menu not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.menusService.remove(id);
  }
}