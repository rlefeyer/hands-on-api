import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Query(() => String)
  helloWorld() {
    return 'Hello from Items!';
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemService.findOne(id);
  }

  @Query(() => [Item], { name: 'items' })
  findAll() {
    return this.itemService.findAll();
  }
}
