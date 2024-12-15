import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { Menu } from 'src/menus/entities/menu.entity';

@Entity()
@ObjectType()
export class Restaurant {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field()
  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Field(() => [Menu], { nullable: true })
  @OneToMany(() => Menu, (menu) => menu.restaurant, { cascade: true })
  menus?: Menu[];

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  rating?: number;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  openingHours?: string;
}
