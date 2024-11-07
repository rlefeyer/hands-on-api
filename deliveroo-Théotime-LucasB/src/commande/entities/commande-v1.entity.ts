import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '../../menu/entities/menu.entity';
import { User } from '../../user/entities/user.entity';

export class CommandeV1 {
  @ApiProperty({ description: 'The unique identifier of the commande', example: 1 })
  id: number;

  @ApiProperty({ description: 'The list of menus in the commande', type: [Menu] })
  menus: Menu[];

  @ApiProperty({ description: 'The total price of the commande', example: 49.99 })
  prix: number;

  @ApiProperty({ description: 'The user who placed the commande', type: User })
  user: User;

  constructor(id: number, menus: Menu[], prix: number, user: User) {
    this.id = id;
    this.menus = menus;
    this.prix = prix;
    this.user = user;
  }
}