import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {MenusService} from "./menus.service";
import {CreateMenuDto} from "./dto/create-menu.dto";
import {UpdateMenuDto} from "./dto/update-menu.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Menu} from "./entities/menu.entity";

@ApiTags("Menus")
@Controller("menus")
export class MenusController {
    constructor(private readonly menusService: MenusService) {
    }

    @Post()
    @ApiResponse({status: 201, description: "The record has been successfully created."})
    @ApiOperation({deprecated: true})
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menusService.create(createMenuDto);
    }

    @Get()
    @ApiResponse({status: 200, description: "The records has been successfully returned.", type: [Menu]})
    @ApiOperation({deprecated: true})
    findAll() {
        return this.menusService.findAll();
    }

    @Get(":id")
    @ApiResponse({status: 200, description: "The record has been successfully returned.", type: Menu})
    @ApiOperation({deprecated: true})
    findOne(@Param("id") id: number) {
        return this.menusService.findOne(+id);
    }

    @Patch(":id")
    @ApiResponse({status: 200, description: "The record has been successfully updated.", type: Menu})
    @ApiOperation({deprecated: true})
    update(@Param("id") id: number, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menusService.update(+id, updateMenuDto);
    }

    @Delete(":id")
    @ApiResponse({status: 200, description: "The record has been successfully deleted."})
    @ApiResponse({status: 403, description: "Forbidden."})
    @ApiResponse({status: 404, description: "Not Found."})
    @ApiOperation({deprecated: true})
    remove(@Param("id") id: number) {
        return this.menusService.remove(+id);
    }
}
