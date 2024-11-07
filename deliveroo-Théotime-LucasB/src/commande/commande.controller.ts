import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandeService } from './commande.service';
import { CreateCommandeDtoV1 } from './dto/create-commande-v1.dto';
import { CreateCommandeDtoV2 } from './dto/create-commande-v2.dto'
import { UpdateCommandeDtoV1 } from './dto/update-commande-v1.dto';
import { UpdateCommandeDtoV2 } from './dto/update-commande-v2.dto';
import { CommandeV1 } from './entities/commande-v1.entity';
import { CommandeV2 } from './entities/commande-v2.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { Item } from 'src/items/entities/item.entity';
import { Version } from '@nestjs/common';

@ApiTags('commande')
@Controller('commande')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new commande', deprecated: true })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The commande has been successfully created.', type: CommandeV1 })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @HttpCode(HttpStatus.CREATED)
  createV1(@Body() createCommandeDto: CreateCommandeDtoV1) {
    return this.commandeService.create(createCommandeDto);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new commande' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The commande has been successfully created.', type: CommandeV2 })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @HttpCode(HttpStatus.CREATED)
  @Version('2')
  createV2(@Body() createCommandeDto: CreateCommandeDtoV2) {
    return this.commandeService.createV2(createCommandeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all commandes', deprecated: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all commandes.', type: [CommandeV1] })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  findAllV1() {
    return this.commandeService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'Get all commandes' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all commandes.', type: [CommandeV2] })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @Version('2')
  findAllV2() {
    return this.commandeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a commande by ID', deprecated: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the commande with the given ID.', type: CommandeV1 })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  findOneV1(@Param('id') id: string) {
    return this.commandeService.findOne(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a commande by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the commande with the given ID.', type: CommandeV2 })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @Version('2')
  findOneV2(@Param('id') id: string) {
    return this.commandeService.findOne(+id);
  }

  @Get(':id/menus')
  @ApiOperation({ summary: 'Get a menu with commande by ID', deprecated: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the menu by commande with the given ID.', type: [CommandeV1] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  findMenus(@Param('id') id: string) {
    return this.commandeService.findMenus(+id);
  }

  @Get(':id/items')
  @ApiOperation({ summary: 'Get a items with commande by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the items by commande with the given ID.', type: [CommandeV2] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @Version('2')
  findItems(@Param('id') id: string) {
    return this.commandeService.findItems(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a commande by ID', deprecated: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'The commande has been successfully updated.', type: CommandeV1 })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  updateV1(@Param('id') id: string, @Body() updateCommandeDto: UpdateCommandeDtoV1) {
    return this.commandeService.update(+id, updateCommandeDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a commande by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The commande has been successfully updated.', type: CommandeV2 })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @Version('2')
  updateV2(@Param('id') id: string, @Body() updateCommandeDto: UpdateCommandeDtoV2) {
    return this.commandeService.update(+id, updateCommandeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a commande by ID', deprecated: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'The commande has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  removeV1(@Param('id') id: string) {
    return this.commandeService.remove(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a commande by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The commande has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @Version('2')
  removeV2(@Param('id') id: string) {
    return this.commandeService.remove(+id);
  }
}