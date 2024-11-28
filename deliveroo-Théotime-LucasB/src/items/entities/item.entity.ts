import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'The unique identifier of the item', example: 1 })
    id: number;

    @Column({ length: 100 })
    @ApiProperty({ description: 'The name of the item', example: 'Burger' })
    name: string;

    @Column({ type: 'text' })
    @ApiPropertyOptional({ description: 'The description of the item', example: 'A delicious beef burger' })
    description?: string;

    @Column({ type: 'float' })
    @ApiProperty({ description: 'The price of the item', example: 9.99 })
    price: number;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.items, {nullable: false})
    @ApiProperty({ description: 'The restaurant associated with the item', type: () => Restaurant })
    restaurant: Restaurant;

    constructor(id: number, name: string, price: number, restaurant: Restaurant, description?: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.restaurant = restaurant;
        this.description = description;
    }
}