import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateItemDto } from './create-item.dto';

@InputType()
export class UpdateItemDto extends PartialType(CreateItemDto) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  restaurantId?: number;
}
