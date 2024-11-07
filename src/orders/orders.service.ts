import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  create(createOrderDto: CreateOrderDto): Order {
    const newOrder: Order = {
      id: uuidv4(),
      ...createOrderDto,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  findAll(): Order[] {
    return this.orders;
  }

  findOne(id: string): Order {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  update(id: string, updateOrderDto: UpdateOrderDto): Order {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    this.orders[orderIndex] = { ...this.orders[orderIndex], ...updateOrderDto };
    return this.orders[orderIndex];
  }

  remove(id: string): void {
    const orderIndex = this.orders.findIndex((order) => order.id === id);
    if (orderIndex === -1) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    this.orders.splice(orderIndex, 1);
  }

  findAllMenus() {
    const allMenus = this.orders.flatMap((order) => order.menus);
    if (allMenus.length === 0) {
      throw new NotFoundException('No menus found');
    }
    return allMenus;
  }

  findOneMenu(id: string) {
    return this.findOne(id).menus;
  }
}
