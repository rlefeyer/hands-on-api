import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@ApiTags('Items')
@Controller({ path: 'items', version: '2' })
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel item' })
  @ApiResponse({ status: 201, description: "L'item a été créé avec succès." })
  @ApiResponse({
    status: 400,
    description: 'Les données fournies sont incorrectes.',
  })
  @ApiResponse({
    status: 404,
    description: "Le restaurant spécifié n'a pas été trouvé.",
  })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les items' })
  @ApiResponse({
    status: 200,
    description: 'Liste des items récupérée avec succès.',
    type: [Item],
  })
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un item par ID' })
  @ApiResponse({ status: 200, description: 'Item trouvé.', type: Item })
  @ApiResponse({ status: 404, description: 'Item non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un item' })
  @ApiResponse({
    status: 200,
    description: "L'item a été mis à jour avec succès.",
    type: Item,
  })
  @ApiResponse({
    status: 400,
    description: 'Les données fournies sont incorrectes.',
  })
  @ApiResponse({ status: 404, description: 'Item ou restaurant non trouvé.' })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un item' })
  @ApiResponse({
    status: 200,
    description: "L'item a été supprimé avec succès.",
    type: Item,
  })
  @ApiResponse({ status: 404, description: 'Item non trouvé.' })
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
