import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuModule } from './menu/menu.module';
import { CommandeModule } from './commande/commande.module';
import { ItemsModule } from './items/items.module';
import { CategoriesModule } from './categories/categories.module';
import { User } from './user/entities/user.entity';
import { Restaurant } from './restaurant/entities/restaurant.entity';
import { Menu } from './menu/entities/menu.entity';
import { Item } from './items/entities/item.entity';
import { Commande } from './commande/entities/commande-v2.entity';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [UserModule, RestaurantModule, MenuModule, CommandeModule, ItemsModule, CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'root',
      username: 'postgres',
      entities: [User, Restaurant, Menu, Item, Commande, Category],
      database: 'deliveroo', 
      synchronize: true,
      logging: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
