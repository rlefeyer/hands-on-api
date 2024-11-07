import { User } from '../../users/entities/user.entity';
import { Menu } from '../../menus/entities/menu.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 42, required: true })
  price: number;
  @ApiProperty({ example: 'John Doe', required: true })
  user: User;
  @ApiProperty({ example: [], required: false })
  menu: Menu[];
}
