import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsString, IsInt, IsNumber, IsOptional, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateItemInput {
  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  @Field({ nullable: true })
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @Field(() => Float)
  price: number;

  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  restaurantId: number;
}