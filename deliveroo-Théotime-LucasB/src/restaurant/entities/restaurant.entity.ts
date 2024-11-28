import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Menu } from 'src/menu/entities/menu.entity';
import { Item } from 'src/items/entities/item.entity';
import { Category } from 'src/categories/entities/category.entity';

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
  
  @OneToMany(() => Menu, (menu) => menu.restaurant)
  @ApiProperty({ description: 'The menu associated with the restaurant', type: () => Menu })
  menu: Menu[]

  @OneToMany(() => Item, (item) => item.restaurant)
  @ApiProperty({ description: 'The item associated with the restaurant', type: () => Menu })
  items: Item[]

  @ManyToOne(() => Category, (category => category.restaurants), { nullable: false })
  @ApiProperty({ description: 'The category associated with the restaurant', type: () => Category })
  category: Category;

  constructor(id: number, name: string, address: string, description?: string, rating?: number, hours?: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.description = description;
    this.rating = rating;
    this.hours = hours;
  }
}