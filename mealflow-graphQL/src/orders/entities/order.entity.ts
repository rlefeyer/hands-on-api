import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Item } from 'src/items/entities/item.entity';

@Entity()
@ObjectType()
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Item])
  @ManyToMany(() => Item)
  @JoinTable()
  items: Item[];

  @Field(() => Float)
  @Column('decimal')
  price: number;

  @Field(() => Int)
  @Column()
  userId: number;
}
