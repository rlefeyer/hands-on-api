import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@ObjectType()
@Entity()
export class Item {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.items, { nullable: false })
  restaurant: Restaurant;

  constructor(id: number, name: string, price: number, restaurant: Restaurant, description?: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.restaurant = restaurant;
    this.description = description;
  }
}