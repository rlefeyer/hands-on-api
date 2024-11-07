import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Item } from '../../items/entities/item.entity';

export class CommandeV2 {
  @ApiProperty({ description: 'The unique identifier of the commande', example: 1 })
  id: number;

  @ApiProperty({ description: 'The list of items in the commande', type: [Item] })
  items: Item[];

  @ApiProperty({ description: 'The total price of the commande', example: 49.99 })
  prix: number;

  @ApiProperty({ description: 'The user who placed the commande', type: User })
  user: User;

  constructor(id: number, items: Item[], prix: number, user: User) {
    this.id = id;
    this.items = items;
    this.prix = prix;
    this.user = user;
  }
}