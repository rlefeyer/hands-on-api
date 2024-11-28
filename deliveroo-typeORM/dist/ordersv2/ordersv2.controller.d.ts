import { Ordersv2Service } from './ordersv2.service';
import { CreateOrdersv2Dto } from './dto/create-ordersv2.dto';
import { UpdateOrdersv2Dto } from './dto/update-ordersv2.dto';
import { Item } from 'src/items/entities/item.entity';
import { Ordersv2 } from './entities/ordersv2.entity';
export declare class Ordersv2Controller {
    private readonly ordersv2Service;
    constructor(ordersv2Service: Ordersv2Service);
    create(createOrdersv2Dto: CreateOrdersv2Dto): Promise<Ordersv2>;
    findAll(): Promise<Ordersv2[]>;
    findOne(id: string): Promise<Ordersv2>;
    update(id: string, updateOrdersv2Dto: UpdateOrdersv2Dto): Promise<Ordersv2>;
    remove(id: string): Promise<void>;
    findItems(id: string): Promise<Item[]>;
}
