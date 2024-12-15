import { InputType, Field, PartialType, Int, Float } from '@nestjs/graphql';
import { IsOptional, IsArray, IsNumber, Min, IsPositive } from 'class-validator';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';

@InputType()
export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @Field(() => [Int], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true, message: 'Each item ID must be a number' })
  items?: number[];

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'The price must be at least 0' })
  price?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'User ID must be a positive number' })
  userId?: number;
}
