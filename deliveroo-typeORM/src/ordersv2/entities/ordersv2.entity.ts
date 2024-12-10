import { ApiProperty } from '@nestjs/swagger';
import { Item } from '../../items/entities/item.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ordersv2 {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Identifiant de la commande' })
  id: number;

  @OneToMany(() => Item, (menu) => menu.id, { cascade: true })
  @ApiProperty({ description: 'Tableau des items de la commande' })
  items: Item[];

  @Column({ type: 'float', default: 0 })
  @ApiProperty({ example: 109.9, description: 'Prix total de la commande' })
  totalPrice: number;

  @OneToOne(() => User, (user) => user?.id, { cascade: true })
  @ApiProperty({ description: 'Utilisateur ayant passé la commande' })
  user: User;

  constructor(partial: Partial<Ordersv2>) {
    Object.assign(this, partial);
  }
}
