import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { Item } from '../items/entities/item.entity';
import { Commande } from './entities/commande-v2.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commande, Item, User])],
  controllers: [CommandeController],
  providers: [CommandeService],
})
export class CommandeModule {}
