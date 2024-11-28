import { Item } from 'src/items/entities/item.entity';
import { ItemsService } from 'src/items/items.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
export declare class OrdersService {
    private ordersRepository;
    private itemsService;
    constructor(ordersRepository: Repository<Order>, itemsService: ItemsService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    remove(id: string): Promise<void>;
    findAllItems(): Promise<Item[]>;
    findOneItem(id: string): Promise<Item[]>;
}
