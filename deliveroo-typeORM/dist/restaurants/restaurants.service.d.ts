import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
export declare class RestaurantsService {
    private readonly restaurantRepository;
    constructor(restaurantRepository: Repository<Restaurant>);
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    findAll(): Promise<Restaurant[]>;
    findOne(id: number): Promise<Restaurant>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    remove(id: number): Promise<void>;
}
