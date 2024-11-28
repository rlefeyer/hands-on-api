import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';

@ApiTags('items')
@Controller('v1/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new Item',
    description: 'Creates a new Item.',
  })
  @ApiBody({ type: CreateItemDto })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all items',
    description: 'Retrieves a list of all items.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of items retrieved successfully',
  })
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific item',
    description: 'Retrieves details of a specific item.',
  })
  @ApiParam({ name: 'id', description: 'Item ID' })
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an item',
    description: 'Updates details of an existing item.',
  })
  @ApiParam({ name: 'id', description: 'Item ID' })
  @ApiBody({ type: UpdateItemDto })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an item',
    description: 'Deletes an existing item.',
  })
  @ApiParam({ name: 'id', description: 'Item ID' })
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
