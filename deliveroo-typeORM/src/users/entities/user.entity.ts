import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Identifiant de l'utilisateur" })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ example: 'John Doe', description: "Nom de l'utilisateur" })
  name: string;

  @Column({ length: 255 })
  @ApiProperty({
    example: '20, Rue de Lille, 59300 Valenciennes',
    description: "Adresse de l'utilisateur",
  })
  address: string;

  @Column({ length: 15 })
  @ApiProperty({
    example: '0666666666',
    description: "Numéro de téléphone de l'utilisateur",
  })
  phone: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
