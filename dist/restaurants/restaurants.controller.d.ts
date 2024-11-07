import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantsController {
    private readonly restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<{
        id: number;
        name: string;
        description?: string;
        address: string;
        menus?: number[];
        rating?: number;
        openingHours?: string;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<any>;
    remove(id: string): Promise<void>;
}
