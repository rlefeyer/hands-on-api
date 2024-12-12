import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from "@nestjs/common";
import {ItemsService} from "./items.service";
import {CreateItemDto} from "./dto/create-item.dto";
import {UpdateItemDto} from "./dto/update-item.dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {Menu} from "../menus/entities/menu.entity";
import {Roles} from "../user/roles.decorator";
import {Role} from "../user/entities/role.enum";
import {ThrottlerGuard} from "@nestjs/throttler";

@ApiTags("Items")
@Controller("items")
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {
    }

    @Roles(Role.Admin)
    @UseGuards(ThrottlerGuard)
    @Post()
    @ApiResponse({status: 201, description: "The item has been successfully created."})
    create(@Body() createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto);
    }

    @Roles(Role.Admin)
    @UseGuards(ThrottlerGuard)
    @Get()
    @ApiResponse({status: 200, description: "The items has been successfully returned.", type: [Menu]})
    findAll() {
        return this.itemsService.findAll();
    }

    @Roles(Role.Admin)
    @UseGuards(ThrottlerGuard)
    @Get(":id")
    @ApiResponse({status: 200, description: "The item has been successfully returned.", type: Menu})
    findOne(@Param("id") id: number) {
        return this.itemsService.findOne(id);
    }

    @Roles(Role.Admin)
    @UseGuards(ThrottlerGuard)
    @Patch(":id")
    @ApiResponse({status: 200, description: "The item has been successfully updated.", type: Menu})
    update(@Param("id") id: number, @Body() updateItemDto: UpdateItemDto) {
        return this.itemsService.update(id, updateItemDto);
    }

    @Roles(Role.Admin)
    @UseGuards(ThrottlerGuard)
    @Delete(":id")
    @ApiResponse({status: 200, description: "The item has been successfully deleted."})
    @ApiResponse({status: 403, description: "Forbidden item."})
    @ApiResponse({status: 404, description: "Item not found."})
    remove(@Param("id") id: number) {
        return this.itemsService.remove(id);
    }
}
