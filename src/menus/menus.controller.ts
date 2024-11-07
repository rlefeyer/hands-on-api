import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenusService } from './menus.service';

@ApiTags('menus')
@Controller('menus')
export class MenusController {
    constructor(private readonly menusService: MenusService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new Menu', description: 'Creates a new Menu' })
    @ApiBody({ type: CreateMenuDto })
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menusService.create(createMenuDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all menus', description: 'Retrieves a list of all menus' })
    @ApiResponse({ status: 200, description: 'List of menus retrieved successfully' })
    findAll() {
        return this.menusService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific menu', description: 'Retrieves details of a specific menu' })
    @ApiParam({ name: 'id', description: 'Menu ID' })
    findOne(@Param('id') id: string) {
        return this.menusService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a menu', description: 'Updates details of an existing menu' })
    @ApiParam({ name: 'id', description: 'Menu ID' })
    @ApiBody({ type: UpdateMenuDto })
    update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menusService.update(id, updateMenuDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a menu', description: 'Deletes an existing menu' })
    @ApiParam({ name: 'id', description: 'Menu ID' })
    remove(@Param('id') id: string) {
        return this.menusService.remove(id);
    }
}
