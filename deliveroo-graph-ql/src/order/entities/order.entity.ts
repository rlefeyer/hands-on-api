import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Item } from 'src/item/entities/item.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Id de la commande' })
  id: number;

  @Column({ type: 'float', default: 0 })
  @Field(() => Number, { description: 'Prix total de la commande' })
  totalPrice: number;

  @OneToMany(() => Item, (menu) => menu.id, { cascade: true })
  @Field(() => [Item], { description: 'Tableau des items de la commande' })
  items: Item[];

  @OneToOne(() => User, (user) => user.id, { cascade: true })
  @Field(() => User, { description: 'Utilisateur ayant passé la commande' })
  user: User;
}
