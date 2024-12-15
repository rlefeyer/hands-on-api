import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Query(() => [Item], { name: 'items' })                         // [Item] est le type de retour et { name: 'items' } est le nom de la requête côté graphQL
  findAll(): Promise<Item[]> {                                    
    return this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'item', nullable: true })                          //idem
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Item | undefined> {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  createItem(@Args('CreateItemDto') CreateItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(CreateItemDto);
  }

  @Mutation(() => Item, { nullable: true })
  updateItem(
    @Args('id', { type: () => Int }) id: number,
    @Args('UpdateItemDto') UpdateItemDto: UpdateItemDto,
  ): Promise<Item | undefined> {
    return this.itemsService.update(id, UpdateItemDto);
  }

  @Mutation(() => Boolean)
  deleteItem(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.itemsService.remove(id).then(() => true);                 // remove l'id et return true 
  }
}
