import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional, IsNumber, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateRestaurantInput {
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 200)
  @Field()
  address: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  rating?: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  hours?: string;

  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  categoryId: number;
}