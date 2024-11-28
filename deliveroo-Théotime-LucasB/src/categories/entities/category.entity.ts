import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the category', example: 1 })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ description: 'The name of the category', example: 'Italian' })
  name: string;

  @Column({ type: 'text' })
  @ApiPropertyOptional({ description: 'The description of the category', example: 'Italian cuisine' })
  description?: string;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.category)
  @ApiProperty({ description: 'The restaurants associated with the category', type: () => Restaurant })
  restaurants: Restaurant[];

  constructor(id: number, name: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}