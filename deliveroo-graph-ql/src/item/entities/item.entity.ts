import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@Entity()
@ObjectType()
export class Item {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: "L'ID de l'item" })
  id: number;

  @Column({ length: 100 })
  @Field(() => String, { description: "Le nom de l'item" })
  name: string;

  @Column({ length: 255, nullable: true })
  @Field(() => String, { description: "La description de l'item" })
  description: string;

  @Column({ type: 'float' })
  @Field(() => Float, { description: "Le prix de l'item" })
  price: number;

  @Column({ type: 'int' })
  @Field(() => Int, { description: "La quantité disponible de l'item" })
  quantity: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.items, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Field(() => Restaurant, {
    nullable: true,
    description: 'Le restaurant auquel cet item est associé',
  })
  restaurant?: Restaurant;

  constructor(partial: Partial<Item>) {
    Object.assign(this, partial);
  }
}
