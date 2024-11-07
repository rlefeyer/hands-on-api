import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {ApiOkResponse} from "@nestjs/swagger";

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @ApiOkResponse({status: 201, description: 'Menu created successfully'})
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  @ApiOkResponse({description: 'All menus returned successfully'})
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({description: 'Menu returned successfully'})
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({description: 'Menu updated successfully'})
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'Menu deleted successfully'})
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
