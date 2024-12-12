import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Menu} from "../../menus/entities/menu.entity";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column({type: 'json'})
  menus: string[];

  @Column()
  note: string;

  @Column()
  schedules: string;
}