import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';
import { IsString, IsInt, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateItemDto extends PartialType(CreateItemDto) {
    @IsOptional()
    @IsInt()
    @ApiPropertyOptional({ description: 'The unique identifier of the item', example: 1 })
    id?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'The name of the item', example: 'Burger' })
    name?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'The description of the item', example: 'A delicious beef burger' })
    description?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ description: 'The price of the item', example: 9.99 })
    price?: number;

    @IsOptional()
    @IsInt()
    @ApiProperty({ description: 'The ID of the restaurant associated with the item', example: 1 })
    restaurantId?: number;
}