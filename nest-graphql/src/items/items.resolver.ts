import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { RestaurantService } from '../restaurant/restaurant.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly restaurantsService: RestaurantService,
  ) {}

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.findOne(id);
  }

  @Query(() => [Item], { name: 'items' })
  findAll() {
    return this.itemsService.findAll();
  }

  @Mutation(() => Item)
  updateItem(@Args('id', { type: () => Int }) id: number, @Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemsService.update(id, updateItemInput);
  }

  @Mutation(() => Boolean)
  removeItem(@Args('id', { type: () => Int }) id: number) {
    return this.itemsService.remove(id);
  }

  @ResolveField(() => Restaurant)
  async restaurant(@Parent() item: Item): Promise<Restaurant> {
    return this.restaurantsService.findOne(item.restaurant.id);
  }
}