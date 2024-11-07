import { IsInt, IsArray, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommandeDtoV1 {
  @IsOptional()
  @IsInt()
  @ApiProperty({ description: 'The unique identifier of the commande', example: 1 })
  id?: number;

  @IsArray()
  @ApiProperty({ description: 'The list of menu IDs in the commande', type: [Number], example: [1, 2, 3] })
  menuIds: number[];

  @IsNumber()
  @ApiProperty({ description: 'The total price of the commande', example: 49.99 })
  prix: number;

  @IsInt()
  @ApiProperty({ description: 'The ID of the user who placed the commande', example: 1 })
  userId: number;
}