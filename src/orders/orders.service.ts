import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  orders = [];

  // Create a new order
  create(createOrderDto: CreateOrderDto) {
    const newOrder = { ...createOrderDto };
    this.orders.push(newOrder);
    return Promise.resolve(newOrder);
  }

  // Retrieve all orders
  findAll() {
    return Promise.resolve(this.orders); 
  }

  // Retrieve an order by ID
  findOne(id: number) {
    const order = this.orders.find(order => order.id === id);
    return Promise.resolve(order);
  }

  // Update an order by ID
  update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = this.orders.find(order => order.id === id);
    if (order) {
      Object.assign(order, updateOrderDto);
    }
    return Promise.resolve(order);
  }

  // Delete an order by ID
  remove(id: number) {
    this.orders = this.orders.filter(order => order.id !== id);
    return Promise.resolve();
  }
}
