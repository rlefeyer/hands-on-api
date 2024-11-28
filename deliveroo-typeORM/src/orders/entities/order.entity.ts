import { ApiProperty } from '@nestjs/swagger';
import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';

export class Order {
  @ApiProperty({ example: 1, description: 'Identifiant de la commande' })
  id: number;
  @ApiProperty({ description: 'Tableau de menus de la commande' })
  menus: Menu[];
  @ApiProperty({ example: 109.9, description: 'Prix total de la commande' })
  totalPrice: number;
  @ApiProperty({ description: 'Utilisateur ayant passé la commande' })
  user: User;

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}
