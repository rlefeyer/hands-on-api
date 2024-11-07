import { CreateRestaurantDto } from './create-restaurant.dto';
declare const UpdateRestaurantDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRestaurantDto>>;
export declare class UpdateRestaurantDto extends UpdateRestaurantDto_base {
    name: string;
    description?: string;
    address: string;
    menus?: number[];
    rating?: number;
    openingHours?: string;
}
export {};
