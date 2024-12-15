import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Item } from '../items/entities/item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Item)
    private readonly menuRepository: Repository<Item>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new order
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { items, userId, price } = createOrderDto;

    // Validate user existence
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // Validate menus existence
    const validMenus = await this.menuRepository.findByIds(items);
    if (validMenus.length !== items.length) {
      throw new NotFoundException(`One or more menu IDs are invalid.`);
    }

    // Create and save the order
    const newOrder = this.orderRepository.create({
      items: validMenus,
      price,
      userId,
    });

    return await this.orderRepository.save(newOrder);
  }

  // Retrieve all orders
  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({ relations: ['items'] });
  }

  // Retrieve an order by ID
  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return order;
  }

  // Update an order by ID
  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (updateOrderDto.items) {
      const validMenus = await this.menuRepository.findByIds(updateOrderDto.items);
      if (validMenus.length !== updateOrderDto.items.length) {
        throw new NotFoundException(`One or more menu IDs are invalid.`);
      }
      order.items = validMenus;
    }

    if (updateOrderDto.price !== undefined) {
      order.price = updateOrderDto.price;
    }

    return await this.orderRepository.save(order);
  }

  // Delete an order by ID
  async remove(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
  }

  // Get menus of an order by ID
  async getMenus(id: number): Promise<Item[]> {
    const order = await this.findOne(id);
    return order.items;
  }

  // Get orders of a user by user ID
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    return await this.orderRepository.find({
      where: { userId },
      relations: ['items'],
    });
  }
}
