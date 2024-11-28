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

import { Ordersv2Service } from './ordersv2.service';
import { CreateOrdersv2Dto } from './dto/create-ordersv2.dto';
import { UpdateOrdersv2Dto } from './dto/update-ordersv2.dto';
import { Item } from 'src/items/entities/item.entity';
import { Ordersv2 } from './entities/ordersv2.entity';

@ApiTags('Commandes')
@Controller({ version: '2', path: 'orders' })
export class Ordersv2Controller {
  constructor(private readonly ordersv2Service: Ordersv2Service) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle commande' })
  @ApiResponse({ status: 201, description: 'Commande créée avec succès.' })
  @ApiResponse({
    status: 400,
    description: 'Les données fournies sont incorrectes.',
  })
  @ApiResponse({
    status: 404,
    description: "Un menu ou un utilisateur n'a pas été trouvé.",
  })
  create(@Body() createOrdersv2Dto: CreateOrdersv2Dto) {
    return this.ordersv2Service.create(createOrdersv2Dto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les commandes' })
  @ApiResponse({
    status: 200,
    description: 'Liste de toutes les commandes récupérée avec succès.',
    type: [Ordersv2],
  })
  findAll() {
    return this.ordersv2Service.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Récupérer une commande par son ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Commande trouvée.',
    type: Ordersv2,
  })
  @ApiResponse({ status: 404, description: 'Commande non trouvée.' })
  findOne(@Param('id') id: string) {
    return this.ordersv2Service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une commande' })
  @ApiResponse({
    status: 200,
    description: 'Commande mise à jour avec succès.',
    type: Ordersv2,
  })
  @ApiResponse({
    status: 400,
    description: 'Les données fournies sont incorrectes.',
  })
  @ApiResponse({
    status: 404,
    description: 'Commande ou utilisateur non trouvé.',
  })
  update(
    @Param('id') id: string,
    @Body() updateOrdersv2Dto: UpdateOrdersv2Dto,
  ) {
    return this.ordersv2Service.update(+id, updateOrdersv2Dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une commande' })
  @ApiResponse({
    status: 200,
    description: 'Commande supprimée avec succès.',
    type: Ordersv2,
  })
  @ApiResponse({ status: 404, description: 'Commande non trouvée.' })
  remove(@Param('id') id: string) {
    return this.ordersv2Service.remove(+id);
  }

  @Get(':id/items')
  @ApiOperation({
    summary: "Récupérer les items d'une commande",
  })
  @ApiResponse({
    status: 200,
    description: 'Items trouvés.',
    type: [Item],
  })
  @ApiResponse({ status: 404, description: 'Commande non trouvée.' })
  findItems(@Param('id') id: string) {
    return this.ordersv2Service.findItems(+id);
  }
}
