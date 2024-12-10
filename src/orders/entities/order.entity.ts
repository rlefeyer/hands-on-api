import { Menu } from '../../menus/entities/menu.entity';
import { User } from '../../users/entities/user.entity';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  menus: string[];
  @Column()
  prix: number;
  @Column()
  user: string;
}
