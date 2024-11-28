import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    findAll(name?: string, adresse?: string): Promise<Restaurant[]>;
    findOne(id: string): Promise<Restaurant>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    remove(id: string): Promise<void>;
}
