import { Menu } from '../../menus/entities/menu.entity';
import { User } from '../../users/entities/user.entity';
import { IsArray, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateOrderDto {

  @ApiProperty({
    description:'Nom de la commande'
  })
  name:string;
  @ApiProperty({
    description: 'Menus de la commande',
    type: [Menu],
    required: true
  })
  @ValidateNested({ each: true })
  @Type(() => Menu)
  menus: Menu[];
  @ApiProperty({
    description: 'Prix de la commande',
    type: Number,
    required: true
  })
  @IsNumber()
  prix: number;
  @ApiProperty({
    description: 'Utilisateur de la commande',
    type: User,
    required: true
  })
  @IsObject()
  user: User;
}
