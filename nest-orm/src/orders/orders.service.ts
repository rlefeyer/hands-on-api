import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Order} from "./entities/order.entity";
import {Repository} from "typeorm";

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>
  ) {}

  create(createOrderDto: CreateOrderDto) {
    const name = createOrderDto.name;
    const menus = createOrderDto.menus;
    const price = createOrderDto.price;
    const user = createOrderDto.user;
    return this.ordersRepository.save({name, menus, price, user});
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
