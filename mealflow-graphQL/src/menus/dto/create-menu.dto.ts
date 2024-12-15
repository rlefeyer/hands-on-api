import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateMenuDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'The name must be at least 3 characters long' })
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'The description must be at least 10 characters long' })
  description?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;
}
