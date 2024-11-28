import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Item} from "../items/entities/item.entity";
import {Menu} from "./entities/menu.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
