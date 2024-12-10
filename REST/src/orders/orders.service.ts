import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";
import {Menu} from "../menus/entities/menu.entity";
import {Item} from "../Items/entities/item.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ["user", "menus"] });
  }

  async findOne(id: string): Promise<Order> {
    return this.orderRepository.findOne({ where: { id }, relations: ["user", "menus"] });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.orderRepository.update(id, updateOrderDto);
    return this.orderRepository.findOne({ where: { id }, relations: ["user", "menus"] });
  }

  async remove(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async findMenus(id: string): Promise<Menu[]> {
    const order = await this.orderRepository.findOne({ where: { id }, relations: ["menus"] });
    return order ? order.menus : [];
  }
}