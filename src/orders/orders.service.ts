import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {Menu} from "../menus/entities/menu.entity";
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsObject} from "class-validator";
import {User} from "../users/entities/user.entity";

interface Order {
    id: number;
    name: string;
    price: number;
}

@Injectable()
export class OrdersService {
  private orders: (CreateOrderDto&{id:number})[] = [];
  create(createOrderDto: CreateOrderDto) {
    this.orders.push({
        id: this.orders.length + 1,
        ...createOrderDto
    });
    return createOrderDto;
  }

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    return this.orders.find(order => order.id === id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = this.orders.find(order => order.id === id);
    if (order) {
        Object.assign(order, updateOrderDto);
        return order;
    }
    return null;
  }

  remove(id: number) {
    this.orders = this.orders.filter(order => order.id !== id);
    return true;
  }
}
