import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersService {
    orders: any[];
    create(createOrderDto: CreateOrderDto): Promise<{
        id: number;
        menus: number[];
        price: number;
        userId: number;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<any>;
    remove(id: number): Promise<void>;
}
