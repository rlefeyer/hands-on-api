import { CreateItemInput } from './create-item.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';
import { IsString, IsInt, IsNumber, IsOptional, Length } from 'class-validator';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @IsInt()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  @Field({ nullable: true })
  description?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  price?: number;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  restaurantId?: number;
}