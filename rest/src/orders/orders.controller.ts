import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from "@nestjs/common";
import {OrdersService} from "./orders.service";
import {CreateOrderDto} from "./dto/create-order.dto";
import {UpdateOrderDto} from "./dto/update-order.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Order} from "./entities/order.entity";
import {Menu} from "../menus/entities/menu.entity";
import {Roles} from "../user/roles.decorator";
import {Role} from "../user/entities/role.enum";
import {ThrottlerGuard} from "@nestjs/throttler";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
    }

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Post()
    @ApiOperation({deprecated: true})
    @ApiResponse({status: 201, description: "The record has been successfully created."})
    @ApiResponse({status: 403, description: "Forbidden."})
    @ApiResponse({status: 400, description: "Bad Request."})
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Post("/v2")
    @ApiResponse({status: 201, description: "The record has been successfully created."})
    @ApiResponse({status: 403, description: "Forbidden."})
    @ApiResponse({status: 400, description: "Bad Request."})
    createV2(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Get()
    @ApiOperation({deprecated: true})
    @ApiResponse({status: 200, description: "The records has been successfully returned.", type: [Order]})
    findAll() {
        return this.ordersService.findAll();
    };

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Get("/v2")
    @ApiResponse({status: 200, description: "The records has been successfully returned.", type: [Order]})
    findAllV2() {
        return this.ordersService.findAll();
    };

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Get(":id")
    @ApiOperation({deprecated: true})
    @ApiResponse({status: 200, description: "The record has been successfully returned.", type: Order})
    findOne(@Param("id") id: number) {
        return this.ordersService.findOne(id);
    }

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Get("/v2/:id")
    @ApiResponse({status: 200, description: "The record has been successfully returned.", type: Order})
    findOneV2(@Param("id") id: number) {
        return this.ordersService.findOne(id);
    }

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Get(":id/menus")
    @ApiOperation({deprecated: true})
    @ApiResponse({status: 200, description: "The record has been successfully returned.", type: [Menu]})
    findMenusById(@Param("id") id: number) {
        return this.ordersService.findOne(id);
    }

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Get(":id/menusV2")
    @ApiResponse({status: 200, description: "The record has been successfully returned.", type: [Menu]})
    findItemsById(@Param("id") id: number) {
        return this.ordersService.findOne(id)["items"];
    }

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Patch(":id")
    @ApiOperation({deprecated: true})
    @ApiResponse({status: 200, description: "The record has been successfully updated.", type: Order})
    update(@Param("id") id: number, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(id, updateOrderDto);
    }

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Patch("/v2/:id")
    @ApiResponse({status: 200, description: "The record has been successfully updated.", type: Order})
    updateV2(@Param("id") id: number, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(id, updateOrderDto);
    }

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Delete(":id")
    @ApiOperation({deprecated: true})
    @ApiResponse({status: 200, description: "The record has been successfully deleted."})
    @ApiResponse({status: 403, description: "Forbidden."})
    @ApiResponse({status: 404, description: "Not Found."})
    remove(@Param("id") id: number) {
        return this.ordersService.remove(id);
    }

    @Roles(Role.User)
    @UseGuards(ThrottlerGuard)
    @Delete("/v2/:id")
    @ApiResponse({status: 200, description: "The record has been successfully deleted."})
    @ApiResponse({status: 403, description: "Forbidden."})
    @ApiResponse({status: 404, description: "Not Found."})
    removeV2(@Param("id") id: number) {
        return this.ordersService.remove(id);
    }
}
