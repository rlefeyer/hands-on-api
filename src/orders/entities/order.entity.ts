import { Menu } from '../../menus/entities/menu.entity';
import { User } from '../../users/entities/user.entity';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => Menu, menu => menu.id)
  menus: Menu[];
  @Column()
  prix: number;
  @ManyToOne(() => User, user => user.id)
  user: User;
}
