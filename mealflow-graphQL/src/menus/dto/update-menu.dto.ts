import { InputType, Field, PartialType, Int, Float } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber, MinLength } from 'class-validator';
import { CreateMenuDto } from 'src/menus/dto/create-menu.dto';

@InputType()
export class UpdateMenuDto extends PartialType(CreateMenuDto) {
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

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  restaurantId?: number;
}
