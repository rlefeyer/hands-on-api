import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Item} from "../../items/entities/item.entity";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Restaurant {

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
  @Column({type: "varchar", length: 30})
  categorie: string;

  @Field()
  @Column({type: "varchar", length: 255})
  adresse: string;

  @Field(() => [Item])
  @ManyToMany(() => Item, item => item.restaurant)
  @JoinTable()
  menu: Item[];

  @Field()
  @Column({type: "int"})
  note: number;

  @Field()
  @Column({type: "varchar", length: 30})
  horaires: string;
}
