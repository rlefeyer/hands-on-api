import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nom: string;
  @Column()
  description: string;
  @Column()
  prix: number;
  @ManyToOne(() => Restaurant, restaurant => restaurant.id)
  restaurant: Restaurant
}
