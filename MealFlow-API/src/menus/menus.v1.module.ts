import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenusControllev1 } from './menus.v1.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]), 
  ],
  controllers: [MenusControllev1],
  providers: [MenusService],
})
export class MenusModuleV1 {}
