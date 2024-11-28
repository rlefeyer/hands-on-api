import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    try {
      const restaurant = await this.restaurantRepository.findOneBy({id: createMenuDto.restaurantId});
      const newMenu = this.menuRepository.create({...createMenuDto, restaurant: restaurant});
      return await this.menuRepository.save(newMenu);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create menu');
    }
  }

  async findAll(): Promise<Menu[]> {
    try {
      return await this.menuRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve menus');
    }
  }

  async findOne(id: number): Promise<Menu> {
    try {
      const menu = await this.menuRepository.findOne({ where: { id } });
      if (!menu) {
        throw new NotFoundException(`Menu with ID ${id} not found`);
      }
      return menu;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve menu'); 
    }
  }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    try {
      const restaurant = await this.restaurantRepository.findOneBy({id: updateMenuDto.restaurantId});
      delete updateMenuDto.restaurantId;
      const result = await this.menuRepository.update(id, {...updateMenuDto, restaurant});
      if (result.affected === 0) {
        throw new NotFoundException(`Menu with ID ${id} not found`);
      }
      const updatedMenu = await this.findOne(id);
      return updatedMenu;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update menu');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.menuRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Menu with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete menu');
    }
  }
}
