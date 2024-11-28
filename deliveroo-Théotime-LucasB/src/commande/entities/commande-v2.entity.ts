import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Item } from '../../items/entities/item.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the commande', example: 1 })
  id: number;

  @ManyToMany(() => Item)
  @JoinTable()
  @ApiProperty({ description: 'The list of items in the commande', type: [Item] })
  items: Item[]

  @Column({type: "float"})
  @ApiProperty({ description: 'The total price of the commande', example: 49.99 })
  prix: number;

  @ManyToOne(() => User, (user) => user.commandes, {nullable: false})
  @ApiProperty({ description: 'The user who placed the commande', type: () => User })
  user: User;

  constructor(id: number, items: Item[], prix: number, user: User) {
    this.id = id;
    this.items = items;
    this.prix = prix;
    this.user = user;
  }
}