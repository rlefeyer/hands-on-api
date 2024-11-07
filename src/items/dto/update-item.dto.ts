import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto {
  @ApiProperty({ description: 'Name of the item', required: false })
  name?: string;

  @ApiProperty({ description: 'Description of the item', required: false })
  description?: string;

  @ApiProperty({ description: 'Price of the item', required: false })
  price?: number;
}
