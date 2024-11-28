import { Injectable } from '@nestjs/common';
// import { CreateOrderInput } from './dto/create-order.input';
// import { UpdateOrderInput } from './dto/update-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  // create(createOrderInput: CreateOrderInput) {
  //   return 'This action adds a new order';
  // }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  // update(id: number, updateOrderInput: UpdateOrderInput) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
