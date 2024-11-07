import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuModule } from './menu/menu.module';
import { CommandeModule } from './commande/commande.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [UserModule, RestaurantModule, MenuModule, CommandeModule, ItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
