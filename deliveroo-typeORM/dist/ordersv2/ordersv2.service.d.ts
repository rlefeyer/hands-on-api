import { Repository } from 'typeorm';
import { CreateOrdersv2Dto } from './dto/create-ordersv2.dto';
import { UpdateOrdersv2Dto } from './dto/update-ordersv2.dto';
import { Ordersv2 } from './entities/ordersv2.entity';
import { Item } from 'src/items/entities/item.entity';
export declare class Ordersv2Service {
    private readonly ordersv2Repository;
    constructor(ordersv2Repository: Repository<Ordersv2>);
    create(createOrdersv2Dto: CreateOrdersv2Dto): Promise<Ordersv2>;
    findAll(): Promise<Ordersv2[]>;
    findOne(id: number): Promise<Ordersv2>;
    update(id: number, updateOrdersv2Dto: UpdateOrdersv2Dto): Promise<Ordersv2>;
    remove(id: number): Promise<void>;
    findItems(id: number): Promise<Item[]>;
}
