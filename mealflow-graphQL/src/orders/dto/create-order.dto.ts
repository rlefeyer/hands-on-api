import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsArray, IsNumber, Min, IsPositive } from 'class-validator';

@InputType()
export class CreateOrderDto {
  @Field(() => [Int])
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true, message: 'Each item ID must be a number' })
  items: number[];

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'The price must be at least 0' })
  price: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'User ID must be a positive number' })
  userId: number;
}
