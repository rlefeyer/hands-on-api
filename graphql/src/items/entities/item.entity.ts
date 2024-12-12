import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Restaurant} from "../../restaurant/entities/restaurant.entity";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Item {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({type: "varchar", length: 30})
  name: string;

  @Field()
  @Column({type: "varchar", length: 255})
  description: string;

  @Field()
  @Column({type: "int"})
  prix: number;

  @Field(()=> [Restaurant])
  @ManyToMany(() => Restaurant, restaurant => restaurant.menu)
  restaurant: Restaurant[];
}
