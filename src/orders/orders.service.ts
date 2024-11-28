import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';
import { ItemsService } from 'src/items/items.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private itemsService: ItemsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { items: itemDtos, ...orderData } = createOrderDto;
    const order = this.ordersRepository.create(orderData);

    if (itemDtos) {
      const items = await Promise.all(
        itemDtos.map((item) => this.itemsService.findOne(item.itemId)),
      );
      order.items = items;
    }

    return this.ordersRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['user', 'menus', 'items'],
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user', 'menus', 'items'],
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    Object.assign(order, updateOrderDto);
    return this.ordersRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const result = await this.ordersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order #${id} not found`);
    }
  }

  async findAllItems(): Promise<Item[]> {
    const orders = await this.ordersRepository.find({
      relations: ['items'],
    });
    return orders.flatMap((order) => order.items || []);
  }

  async findOneItem(id: string): Promise<Item[]> {
    const order = await this.findOne(id);
    return order.items || [];
  }
}
