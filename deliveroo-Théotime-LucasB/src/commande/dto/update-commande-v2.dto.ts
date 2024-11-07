import { PartialType } from '@nestjs/mapped-types';
import { CreateCommandeDtoV2 } from './create-commande-v2.dto';
import { IsInt, IsArray, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommandeDtoV2 extends PartialType(CreateCommandeDtoV2) {
  @IsOptional()
  @IsInt()
  @ApiProperty({ description: 'The unique identifier of the commande', example: 1 })
  id?: number;

  @IsOptional()
  @IsArray()
  @ApiProperty({ description: 'The list of items IDs in the commande', type: [Number], example: [1, 2, 3] })
  itemsIds?: number[];

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'The total price of the commande', example: 49.99 })
  prix?: number;

  @IsOptional()
  @IsInt()
  @ApiProperty({ description: 'The ID of the user who placed the commande', example: 1 })
  userId?: number;
}