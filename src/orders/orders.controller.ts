import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Version,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all orders.',
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an order by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the order to retrieve' })
  @ApiResponse({ status: 200, description: 'The order with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the order to update' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the order to delete' })
  @ApiResponse({
    status: 200,
    description: 'The order has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Get(':id/menus')

  @ApiOperation({ summary: 'Retrieve menus for a specific order', deprecated: true })
  @ApiParam({ name: 'id', description: 'The ID of the order to retrieve menus for' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved menus for the order.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findMenus(@Param('id') id: string) {
    return this.ordersService.findMenus(id);
  }
  @Version('2')
  @Get(':id/items')
  @ApiOperation({ summary: 'Retrieve items for a specific order' })
  @ApiParam({ name: 'id', description: 'The ID of the order to retrieve menus for' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved items for the order.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findItems(@Param('id') id: string) {
    return this.ordersService.findMenus(id);
  }
}
