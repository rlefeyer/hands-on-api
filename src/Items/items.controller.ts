import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly menusService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  create(@Body() createMenuDto: CreateItemDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all items' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all items.',
  })
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a item by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the item to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'The item with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a item by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the item to update' })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateItemDto) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a item by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the item to delete' })
  @ApiResponse({
    status: 200,
    description: 'The menu item has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
