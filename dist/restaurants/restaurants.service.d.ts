import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantsService {
    restaurant: any[];
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
    findOne(id: number): Promise<any>;
    update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<any>;
    remove(id: number): Promise<void>;
}
