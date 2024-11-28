import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the restaurant', example: 1 })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ description: 'The name of the restaurant', example: 'Le Gourmet' })
  name: string;

  @Column({ type: 'text' })
  @ApiPropertyOptional({ description: 'The description of the restaurant', example: 'A fine dining restaurant' })
  description?: string;

  @Column({ length: 200 })
  @ApiProperty({ description: 'The address of the restaurant', example: '456 Culinary Blvd' })
  address: string;

  @Column({ type: 'float' })
  @ApiPropertyOptional({ description: 'The rating of the restaurant', example: 4.5 }) 
  rating?: number;

  @Column({ length: 100 })
  @ApiPropertyOptional({ description: 'The opening hours of the restaurant', example: 'Mon-Fri 9am-9pm' })
  hours?: string;

  constructor(id: number, name: string, address: string, description?: string, rating?: number, hours?: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.description = description;
    this.rating = rating;
    this.hours = hours;
  }
}