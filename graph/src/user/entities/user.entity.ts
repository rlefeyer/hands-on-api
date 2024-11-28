import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
@Entity()
@ObjectType()
export class User {
  /**   * this decorator will help to auto generate id for the table.   */ @Field(
    () => Int,
  )
  @PrimaryGeneratedColumn()
  id: number;
  @Field() @Column({ type: 'varchar', length: 30 }) name: string;
  @Field() @Column({ type: 'varchar', length: 15 }) username: string;
  @Field() @Column({ type: 'varchar', length: 40 }) email: string;
  @Field() @Column({ type: 'int' }) age: number;
  @Field() @Column({ type: 'varchar' }) password: string;
  @Field() @Column({ type: 'enum', enum: ['m', 'f', 'u'] }) gender: string;
}
