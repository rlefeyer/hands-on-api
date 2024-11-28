import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { Item } from 'src/items/entities/item.entity';
export declare class OrdersControllerV2 {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findAllItems(): Promise<Item[]>;
    findOne(id: string): Promise<Order>;
    findOneItem(id: string): Promise<Item[]>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    remove(id: string): Promise<void>;
}
