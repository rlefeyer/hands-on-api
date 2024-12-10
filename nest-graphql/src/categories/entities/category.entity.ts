import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@ObjectType()
@Entity()
export class Category {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => [Restaurant])
  @OneToMany(() => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];

  constructor(id: number, name: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

