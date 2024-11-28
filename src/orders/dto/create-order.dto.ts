import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';

class OrderItemDto {
  @IsUUID()
  @IsNotEmpty()
  itemId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [Menu], required: false })
  @IsArray()
  @IsOptional()
  menus?: Menu[];

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsOptional()
  items?: OrderItemDto[];

  @ApiProperty()
  @IsNumber()
  @Min(0)
  prix: number;

  @ApiProperty({ type: () => User })
  @IsNotEmpty()
  user: User;
}
