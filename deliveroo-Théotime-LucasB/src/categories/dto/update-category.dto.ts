import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsOptional()
    @IsInt()
    @ApiPropertyOptional({ description: 'The unique identifier of the category', example: 1 })
    id?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'The name of the category', example: 'Italian' })
    name?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: 'The description of the category', example: 'Italian cuisine' })
    description?: string;
}