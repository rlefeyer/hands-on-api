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
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@ApiTags('Menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau menu', deprecated: true })
  @ApiResponse({ status: 201, description: 'Le menu a été créé avec succès.' })
  @ApiResponse({
    status: 400,
    description: 'Les données fournies sont incorrectes.',
  })
  @ApiResponse({
    status: 404,
    description: "Le restaurant spécifié n'a pas été trouvé.",
  })
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les menus', deprecated: true })
  @ApiResponse({
    status: 200,
    description: 'Liste des menus récupérée avec succès.',
  })
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un menu par ID', deprecated: true })
  @ApiResponse({ status: 200, description: 'Menu trouvé.' })
  @ApiResponse({ status: 404, description: 'Menu non trouvé.' })
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un menu', deprecated: true })
  @ApiResponse({
    status: 200,
    description: 'Le menu a été mis à jour avec succès.',
  })
  @ApiResponse({
    status: 400,
    description: 'Les données fournies sont incorrectes.',
  })
  @ApiResponse({ status: 404, description: 'Menu ou restaurant non trouvé.' })
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un menu', deprecated: true })
  @ApiResponse({
    status: 200,
    description: 'Le menu a été supprimé avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Menu non trouvé.' })
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
