import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from '../../orders.service';
import { CreateOrderDto } from '../../dto/create-order.dto';
import { UpdateOrderDto } from '../../dto/update-order.dto';
import {ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Orders v2')
@Controller('v2/orders')
export class OrdersV2Controller {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @ApiOkResponse({ status: 201, description: 'Order created successfully in v2' })
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    @ApiOkResponse({ description: 'All orders returned successfully in v2' })
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id/items')
    @ApiOkResponse({ description: 'Order returned successfully in v2' })
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @Patch(':id')
    @ApiOkResponse({ description: 'Order updated successfully in v2' })
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(+id, updateOrderDto);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'Order deleted successfully in v2' })
    remove(@Param('id') id: string) {
        return this.ordersService.remove(+id);
    }
}