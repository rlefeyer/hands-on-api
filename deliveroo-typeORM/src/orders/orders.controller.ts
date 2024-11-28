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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Menu } from 'src/menus/entities/menu.entity';
import { Order } from './entities/order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle commande', deprecated: true })
  @ApiResponse({ status: 201, description: 'Commande créée avec succès.' })
  @ApiResponse({
    status: 400,
    description: 'Les données fournies sont incorrectes.',
  })
  @ApiResponse({
    status: 404,
    description: "Un menu ou un utilisateur n'a pas été trouvé.",
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les commandes', deprecated: true })
  @ApiResponse({
    status: 200,
    description: 'Liste de toutes les commandes récupérée avec succès.',
    type: [Order],
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Récupérer une commande par son ID',
    deprecated: true,
  })
  @ApiResponse({ status: 200, description: 'Commande trouvée.', type: Order })
  @ApiResponse({ status: 404, description: 'Commande non trouvée.' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une commande', deprecated: true })
  @ApiResponse({
    status: 200,
    description: 'Commande mise à jour avec succès.',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description: 'Les données fournies sont incorrectes.',
  })
  @ApiResponse({
    status: 404,
    description: 'Commande ou utilisateur non trouvé.',
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une commande', deprecated: true })
  @ApiResponse({
    status: 200,
    description: 'Commande supprimée avec succès.',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'Commande non trouvée.' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Get(':id/menus')
  @ApiOperation({
    summary: "Récupérer les menus d'une commande",
    deprecated: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Menus trouvés.',
    type: [Menu],
  })
  @ApiResponse({ status: 404, description: 'Commande non trouvée.' })
  findMenus(@Param('id') id: string) {
    return this.ordersService.findMenus(+id);
  }
}
