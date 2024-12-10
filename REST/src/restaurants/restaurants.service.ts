import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dto/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    return this.restaurantRepository.save(restaurant);
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find({ relations: ["menus"] });
  }

  async findOne(id: number): Promise<Restaurant> {
    return this.restaurantRepository.findOne({ where: { id }, relations: ["menus"] });
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    await this.restaurantRepository.update(id, updateRestaurantDto);
    return this.restaurantRepository.findOne({ where: { id }, relations: ["menus"] });
  }

  async remove(id: number): Promise<void> {
    await this.restaurantRepository.delete(id);
  }
}