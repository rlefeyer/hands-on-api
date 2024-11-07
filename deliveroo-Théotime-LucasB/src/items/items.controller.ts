import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Version } from '@nestjs/common';

@ApiTags('item')
@Controller('item')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The item has been successfully created.', type: Item })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @Version('2')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all items.', type: [Item] })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @Version('2')
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the item with the given ID.', type: Item })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @Version('2')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The item has been successfully updated.', type: Item })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @Version('2')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The item has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Item not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @Version('2')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}