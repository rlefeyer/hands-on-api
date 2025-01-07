import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenusModule } from './menus/menus.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./auth/roles.guard";

@Module({
  imports: [
    ConfigModule.forRoot(),
    RestaurantsModule,
    MenusModule,
    OrdersModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('HOST'),
        port: +configService.getOrThrow('PORT'),
        username: configService.getOrThrow('USERNAME'),
        password: configService.getOrThrow('PASSWORD'),
        database: configService.getOrThrow('DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
