import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@Entity() 
@ObjectType() 
export class User {

  @Field(() => Int)           // champ field => int car id 
  @PrimaryGeneratedColumn() 
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 }) 
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @Column({ type: 'text', nullable: true })
  @IsString()
  address: string;

  
  @Field()
  @Column({ type: 'varchar', length: 15 })
  @IsString()
  phone: string;
}
