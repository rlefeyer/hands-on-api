import {Injectable} from "@nestjs/common";
import {CreateOrderDto} from "./dto/create-order.dto";
import {UpdateOrderDto} from "./dto/update-order.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Order} from "./entities/order.entity";

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    ) {
    }

    create(createOrderDto: CreateOrderDto) {
        try {
            return this.orderRepository.save(createOrderDto);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    findAll() {
        return this.orderRepository.find();
    }

    findOne(id: number) {
        return this.orderRepository.findOne({where: {id}});
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        return this.orderRepository.update(id, updateOrderDto).then(() => {
            return this.orderRepository.findOne({where: {id}});
        });
    }

    async remove(id: number) {
        return this.orderRepository.delete(id).then((order) => {
            return order.affected >= 1;
        });
    }
}
