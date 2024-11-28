  import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the menu', example: 1 })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ description: 'The name of the menu', example: 'Lunch Menu' })
  name: string;

  @Column({ type: 'text' })
  @ApiPropertyOptional({ description: 'The description of the menu', example: 'A selection of lunch items' })
  description?: string;

  @Column({ type: 'float' })
  @ApiProperty({ description: 'The price of the menu', example: 19.99 })
  price: number;

  @ManyToOne(() => Restaurant, (restaurant => restaurant.menu), { nullable: false })
  @ApiProperty({ description: 'The restaurant associated with the menu', type: () => Restaurant })
  restaurant: Restaurant;

  constructor(id: number, name: string, price: number, restaurant: Restaurant, description?: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.restaurant = restaurant;
    this.description = description;
  }
}