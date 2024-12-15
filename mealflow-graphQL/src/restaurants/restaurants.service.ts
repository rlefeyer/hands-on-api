import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from 'src/restaurants/dto/create-restaurant.dto';
import { UpdateRestaurantDto } from 'src/restaurants/dto/update-restaurant.dto';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Menu } from 'src/menus/entities/menu.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>, 
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const { menus, ...rest } = createRestaurantDto;

    let menuEntities: Menu[] = [];
    if (menus && menus.length > 0) {
      // On convertit les IDs des menus en entités
      menuEntities = await this.menuRepository.findByIds(menus);

      if (menuEntities.length !== menus.length) {
        throw new NotFoundException('Some menu IDs are invalid');
      }
    }

    const newRestaurant = this.restaurantRepository.create({
      ...rest,
      menus: menuEntities,
    });

    return await this.restaurantRepository.save(newRestaurant);
  }

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find({
      relations: ['menus'], 
    });
  }

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
      relations: ['menus'],
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found.`);
    }

    return restaurant;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    const { menus, ...rest } = updateRestaurantDto;

    const restaurant = await this.findOne(id);

    if (menus && menus.length > 0) {
      const menuEntities = await this.menuRepository.findByIds(menus);

      if (menuEntities.length !== menus.length) {
        throw new NotFoundException('Some menu IDs are invalid');
      }

      restaurant.menus = menuEntities;
    }

    Object.assign(restaurant, rest);

    return await this.restaurantRepository.save(restaurant);
  }

  async remove(id: number): Promise<void> {
    const result = await this.restaurantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Restaurant with ID ${id} not found.`);
    }
  }
}
