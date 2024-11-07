import { CreateMenuDto } from './create-menu.dto';
declare const UpdateMenuDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMenuDto>>;
export declare class UpdateMenuDto extends UpdateMenuDto_base {
    name: string;
    description?: string;
    price: number;
    restaurantId: number;
}
export {};
