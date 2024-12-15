import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Query(() => [Restaurant], { name: 'restaurants' })
  findAll(): Promise<Restaurant[]> {                    // [Restaurant] est le type de retour et dans graphQL, on l'appelle comme ça : { name: 'restaurants' }        
    return this.restaurantsService.findAll();
  }

  @Query(() => Restaurant, { name: 'restaurant', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Restaurant | undefined> {            //idem mais ici le type:() est le type de l'id imposé => ici int 
    return this.restaurantsService.findOne(id);
  }

  @Mutation(() => Restaurant)
  createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantsService.create(createRestaurantInput);
  }

  @Mutation(() => Restaurant, { nullable: true })
  updateRestaurant(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantDto,
  ): Promise<Restaurant | undefined> {
    return this.restaurantsService.update(id, updateRestaurantInput);
  }

  @Mutation(() => Boolean)
  deleteRestaurant(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.restaurantsService.remove(id).then(() => true);
  }
}
