import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
export declare class RestaurantsService {
    private restaurantsRepository;
    constructor(restaurantsRepository: Repository<Restaurant>);
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    findAll(name?: string, adresse?: string): Promise<Restaurant[]>;
    findOne(id: string): Promise<Restaurant>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    remove(id: string): Promise<void>;
    addRating(id: string, rating: number): Promise<Restaurant>;
}
