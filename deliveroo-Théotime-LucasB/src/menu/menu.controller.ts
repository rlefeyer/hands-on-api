import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new menu', deprecated: true })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Le menu a été créé avec succès.', type: Menu })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Les données fournies sont invalides.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur interne du serveur.' })
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all menus', deprecated: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retourne tous les menus.', type: [Menu] })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur interne du serveur.' })
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu by ID', deprecated: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retourne le menu avec l\'ID donné.', type: Menu })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Menu non trouvé.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur interne du serveur.' })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a menu by ID', deprecated: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Le menu a été mis à jour avec succès.', type: Menu })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Menu non trouvé.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Les données fournies sont invalides.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur interne du serveur.' })
  @ApiParam({ name: 'id', description: 'The ID of the menu to update', example: 1 })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu by ID', deprecated: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Le menu a été supprimé avec succès.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Menu non trouvé.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Non autorisé.' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erreur interne du serveur.' })
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}