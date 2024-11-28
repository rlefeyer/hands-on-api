import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ItemModule } from './item/item.module';
import { Restaurant } from './restaurant/entities/restaurant.entity';
import { Item } from './item/entities/item.entity';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'localhost',
      username: 'distrib',
      entities: [User, Restaurant, Item],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    RestaurantModule,
    ItemModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
