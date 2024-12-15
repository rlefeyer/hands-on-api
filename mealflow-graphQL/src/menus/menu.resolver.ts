import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MenusService } from './menu.service';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';

@Resolver(() => Menu)
export class MenuResolver {
  constructor(private readonly menuService: MenusService) {}

  @Query(() => [Menu], { name: 'menus' })
  findAll(): Promise<Menu[]> {              // [Menu] est le type de retour name : menus  le nom de la requête côté graphQL
    return this.menuService.findAll();
  }

    @Query(() => Menu, { name: 'menu', nullable: true })
    findOne(@Args('id', { type: () => Int }) id: number): Promise<Menu | undefined> {
        return this.menuService.findOne(id);
    }

    @Mutation(() => Menu)
    createMenu(@Args('createMenuInput') createMenuInput: CreateMenuDto): Promise<Menu> {
        return this.menuService.create(createMenuInput);
    }

    @Mutation(() => Menu, { nullable: true })
    updateMenu(
        @Args('id', { type: () => Int }) id: number,
        @Args('updateMenuInput') updateMenuInput: CreateMenuDto,
    ): Promise<Menu | undefined> {
        return this.menuService.update(id, updateMenuInput);
    }

    @Mutation(() => Boolean)
    deleteMenu(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
        return this.menuService.remove(id);
    }
}
