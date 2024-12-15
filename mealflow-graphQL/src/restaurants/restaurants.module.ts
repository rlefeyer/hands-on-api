import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { RestaurantsResolver } from 'src/restaurants/restaurants.resolver';
import { Menu } from 'src/menus/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Menu])],
  providers: [RestaurantsService, RestaurantsResolver],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
