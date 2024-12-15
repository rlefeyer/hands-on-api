import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Menu {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'float', nullable: true })
  price?: number;

  @ManyToOne(() => Restaurant, restaurant => restaurant.menus, { onDelete: 'CASCADE', eager: true })
  restaurant: Restaurant;
}
