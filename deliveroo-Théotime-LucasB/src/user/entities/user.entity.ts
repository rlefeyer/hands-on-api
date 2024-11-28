import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Commande } from '../../commande/entities/commande-v2.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the user', example: 1 })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  name: string;

  @Column({ length: 200 })
  @ApiProperty({ description: 'The address of the user', example: '123 Main St' })
  address: string;

  @Column({ length: 15 })
  @ApiProperty({ description: 'The telephone number of the user', example: '+1234567890' })
  telephone: string;

  @OneToMany(() => Commande, (commande) => commande.user)
  @ApiProperty({ description: 'The commande associated with the user', type: () => Commande })
  commandes: Commande[]

  constructor(id: number, name: string, address: string, telephone: string) {   
    this.id = id;
    this.name = name;
    this.address = address;
    this.telephone = telephone;
  }
}