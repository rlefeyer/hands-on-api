import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {Menu} from "../menus/entities/menu.entity";
import {Item} from "./entities/item.entity";

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiResponse({status: 201, description: 'The item has been successfully created.'})
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @ApiResponse({status: 200, description: 'The items has been successfully returned.', type: [Menu]})
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'The item has been successfully returned.', type: Menu})
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({status: 200, description: 'The item has been successfully updated.', type: Menu})
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  @ApiResponse({status: 200, description: 'The item has been successfully deleted.'})
  @ApiResponse({status: 403, description: 'Forbidden item.'})
  @ApiResponse({status: 404, description: 'Item not found.'})
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
