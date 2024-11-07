import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOkResponse({status: 201, description: 'Order created successfully'})
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOkResponse({description: 'All orders returned successfully'})
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id/menus')
  @ApiOkResponse({description: 'Order returned successfully'})
  @ApiOperation({deprecated: true })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({description: 'Order updated successfully'})
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOkResponse({description: 'Order deleted successfully'})
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
