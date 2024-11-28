import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Category {
  @ApiProperty({ description: 'The unique identifier of the category', example: 1 })
  id: number;

  @ApiProperty({ description: 'The name of the category', example: 'Italian' })
  name: string;

  @ApiPropertyOptional({ description: 'The description of the category', example: 'Italian cuisine' })
  description?: string;

  constructor(id: number, name: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}