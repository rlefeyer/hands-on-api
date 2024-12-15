import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Create a new order
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ description: 'The information needed to create an order', type: CreateOrderDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The order has been successfully created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The provided data is invalid.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  // Retrieve all orders
  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The orders have been successfully retrieved.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  findAll() {
    return this.ordersService.findAll();
  }

  // Retrieve an order by ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an order by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the order to retrieve' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The order has been successfully retrieved.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The order was not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  // Update an order by ID
  @Patch(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the order to update' })
  @ApiBody({ description: 'The information needed to update the order', type: UpdateOrderDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'The order has been successfully updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The order was not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The provided data is invalid.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  // Delete an order by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the order to delete' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The order has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The order was not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  // Get menus of an order by ID
  @Get(':id/menus')
  @ApiOperation({ summary: 'Get menus of an order by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the order to get menus' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The menus of the order have been successfully retrieved.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The order was not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  getMenus(@Param('id') id: string) {
    return this.ordersService.getMenus(+id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get orders of a user by user ID' })
  @ApiParam({ name: 'userId', description: 'The ID of the user to get orders' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The orders of the user have been successfully retrieved.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The user was not found.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
  getOrdersByUserId(@Param('userId') userId: string) {
    return this.ordersService.getOrdersByUserId(+userId);
}
}