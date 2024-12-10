import { CreateRestaurantInput } from './create-restaurant.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional, IsNumber, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {
  @IsInt()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  @Field({ nullable: true })
  address?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  rating?: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  hours?: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int, { nullable: true })
  categoryId?: number;
}