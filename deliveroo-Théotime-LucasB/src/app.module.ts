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
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    RestaurantModule,
    MenuModule,
    CommandeModule,
    ItemsModule,
    CategoriesModule,
    AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 120,
      limit: 2,
    }]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'deliveroo',
      entities: [User, Restaurant, Menu, Item, Commande, Category],
      synchronize: true,
      logging: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}