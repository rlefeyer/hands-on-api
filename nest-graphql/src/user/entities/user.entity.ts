import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Commande } from '../../commande/entities/commande-v2.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field()
  @Column({ length: 200 })
  address: string;

  @Field()
  @Column({ length: 15 })
  telephone: string;

  // @Field(() => [Commande], { nullable: true })
  // @OneToMany(() => Commande, (commande) => commande.user)
  // commandes: Commande[];

  constructor(id: number, name: string, address: string, telephone: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.telephone = telephone;
  }
}