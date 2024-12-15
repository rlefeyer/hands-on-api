import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenusService } from 'src/menus/menu.service';
import { MenuResolver } from 'src/menus/menu.resolver';
 

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]), 
  ],
  providers: [
    MenusService,
    MenuResolver,
  ],
    exports: [
        MenusService, 
    ]
})
export class MenuModule {}