import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field()
  @Column({ length: 255 })
  address: string;

  @Field()
  @Column({ length: 15 })
  phone: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
