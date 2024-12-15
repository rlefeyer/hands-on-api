import { Module } from '@nestjs/common';
import { ItemsService } from 'src/items/items.service';
import { Item } from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { ItemsResolver } from 'src/items/items.resolver';


@Module({
  imports: [
    TypeOrmModule.forFeature([Item,Restaurant]), 
  ],
  providers: [
    ItemsService,
    ItemsResolver,
  ],
    exports: [
      ItemsService, 
    ]
})
export class ItemsModule {}