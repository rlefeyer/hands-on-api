import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  // Créer un nouveau menu
  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const newMenu = this.menuRepository.create(createMenuDto);
    return await this.menuRepository.save(newMenu);
  }

  // Récupérer tous les menus
  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find({
      relations: ['restaurant'], // Inclure la relation avec le restaurant
    });
  }

  // Récupérer un menu par son ID
  async findOne(id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['restaurant'], // Inclure la relation avec le restaurant
    });
    if (!menu) {
      throw new NotFoundException(`Menu avec l'ID ${id} non trouvé.`);
    }
    return menu;
  }

  // Mettre à jour un menu
  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.findOne(id);
    const updatedMenu = { ...menu, ...updateMenuDto };
    await this.menuRepository.update(id, updatedMenu);
    return this.menuRepository.findOne({
      where: { id },
      relations: ['restaurant'],
    });
  }

  // Supprimer un menu
  async remove(id: number): Promise<void> {
    const menu = await this.findOne(id);
    await this.menuRepository.remove(menu);
  }
}
