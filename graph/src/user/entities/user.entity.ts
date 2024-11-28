import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Field()
  username: string | null;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Field()
  age: number;

  @Field()
  gender: string;

  @Field()
  password: string;
}
