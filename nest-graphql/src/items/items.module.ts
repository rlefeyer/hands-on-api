import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Item } from './entities/item.entity';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), RestaurantModule],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}