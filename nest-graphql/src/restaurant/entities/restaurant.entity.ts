import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
// import { Menu } from 'src/menu/entities/menu.entity';
// import { Item } from 'src/items/entities/item.entity';
import { Category } from 'src/categories/entities/category.entity';

@ObjectType()
@Entity()
export class Restaurant {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field()
  @Column({ length: 200 })
  address: string;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  rating?: number;

  @Field({ nullable: true })
  @Column({ length: 100, nullable: true })
  hours?: string;

  // @Field(() => [Menu])
  // @OneToMany(() => Menu, (menu) => menu.restaurant)
  // menu: Menu[];

  // @Field(() => [Item])
  // @OneToMany(() => Item, (item) => item.restaurant)
  // items: Item[];

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.restaurants, { nullable: false })
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
