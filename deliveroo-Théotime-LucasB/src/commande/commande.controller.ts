import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandeService } from './commande.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { Item } from 'src/items/entities/item.entity';
import { Version } from '@nestjs/common';

@ApiTags('commande')
@Controller('commande')
export class CommandeController {
  constructor(private readonly commandeService: CommandeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new commande' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The commande has been successfully created.', type: Commande })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCommandeDto: CreateCommandeDto) {
    return this.commandeService.create(createCommandeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all commandes' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all commandes.', type: [Commande] })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  findAll() {
    return this.commandeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a commande by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the commande with the given ID.', type: Commande })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  findOne(@Param('id') id: string) {
    return this.commandeService.findOne(+id);
  }

  @Get(':id/menus')
  @ApiOperation({ summary: 'Get a menu with commande by ID', deprecated: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the menu by commande with the given ID.', type: [Menu] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  findMenus(@Param('id') id: string) {
    return this.commandeService.findMenus(+id);
  }

  @Get(':id/items')
  @ApiOperation({ summary: 'Get a items with commande by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the items by commande with the given ID.', type: [Item] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  @Version('2')
  findItems(@Param('id') id: string) {
    return this.commandeService.findItems(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a commande by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The commande has been successfully updated.', type: Commande })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  update(@Param('id') id: string, @Body() updateCommandeDto: UpdateCommandeDto) {
    return this.commandeService.update(+id, updateCommandeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a commande by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The commande has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Commande not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal Server Error.' })
  remove(@Param('id') id: string) {
    return this.commandeService.remove(+id);
  }
}