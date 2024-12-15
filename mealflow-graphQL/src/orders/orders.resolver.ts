import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';
import { Item } from '../items/entities/item.entity';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Query(() => [Order], { name: 'orders' })        // [Order] est le type de retour et { name: 'orders' } est le nom de la requête côté graphQL
  findAll(): Promise<Order[]> {                      
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order', nullable: true })                          //idem, et  type: () => Int impose que l'id soit un int 
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  createOrder(
    @Args('createOrderDto') createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Mutation(() => Order, { nullable: true })
  updateOrder(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateOrderDto') updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.ordersService.remove(id);
    return true;
  }

  @Query(() => [Item], { name: 'orderItems' })
  getOrderItems(@Args('id', { type: () => Int }) id: number): Promise<Item[]> {
    return this.ordersService.getMenus(id);
  }

  @Query(() => [Order], { name: 'ordersByUser' })
  getOrdersByUserId(@Args('userId', { type: () => Int }) userId: number): Promise<Order[]> {
    return this.ordersService.getOrdersByUserId(userId);
  }
}
