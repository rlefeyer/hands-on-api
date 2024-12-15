import { InputType, Field, Int, Float, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from 'src/restaurants/dto/create-restaurant.dto';
import { IsOptional, IsString, IsArray, IsNumber, Min, Max, MinLength } from 'class-validator';

@InputType()
export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'The name must be at least 3 characters long' })
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'The description must be at least 10 characters long' })
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'The address must be at least 5 characters long' })
  address?: string;

  @Field(() => [Int], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true, message: 'Each menu ID must be a number' })
  menus?: number[];

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'The rating must be at least 0' })
  @Max(5, { message: 'The rating must not exceed 5' })
  rating?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'The opening hours description must be at least 10 characters long' })
  openingHours?: string;
}
