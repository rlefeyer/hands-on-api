import {User} from "../../user/entities/user.entity";
import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Item} from "../../items/entities/item.entity";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Order {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [Item])
  @ManyToMany(() => Item, item => item.id)
  order: Item[];

  @Field()
  @Column({type: "int"})
  prix: number;

  @Field()
  @ManyToOne(() => User, user => user.id)
  User: User;
}
