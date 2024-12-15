import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly menusService: ItemsService) {}

  // Create a new item
  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiBody({ description: 'The information needed to create a item', type: CreateItemDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The item has been successfully created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The provided data is invalid.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createItemDto: CreateItemDto) {
    return this.menusService.create(createItemDto);
  }

  // Retrieve all items
  @Get()
  @ApiOperation({ summary: 'Retrieve all items' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The items have been successfully retrieved.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  findAll() {
    return this.menusService.findAll();
  }

  // Retrieve a item by ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The item has been successfully retrieved.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  findOne(@Param('id') id: number) {
    return this.menusService.findOne(id);
  }

  // Update a item by ID
  @Patch(':id')
  @ApiOperation({ summary: 'Update a item by ID' })
  @ApiBody({ description: 'The information needed to update a item', type: UpdateItemDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'The item has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The provided data is invalid.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.menusService.update(id, updateItemDto);
  }

  // Delete a item by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a item by ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The item has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number) {
    return this.menusService.remove(id);
  }
}