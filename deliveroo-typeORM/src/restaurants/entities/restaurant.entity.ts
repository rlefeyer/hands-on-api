import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Item } from 'src/items/entities/item.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Identifiant du restaurant' })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ example: 'Restaurant 1', description: 'Nom du restaurant' })
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiPropertyOptional({
    example: 'Description du restaurant 1',
    description: 'Description du restaurant',
  })
  description?: string;

  @Column({ length: 255 })
  @ApiProperty({
    example: '123 rue de Paris',
    description: 'Adresse du restaurant',
  })
  address: string;

  @Column({ length: 100 })
  @ApiProperty({
    example: 'Gastronomie française',
    description: 'Catégorie du restaurant',
  })
  category: string;

  @OneToMany(() => Item, (item) => item.restaurant, { cascade: true })
  @ApiProperty({
    type: () => [Item],
    description: 'Items proposés par le restaurant',
  })
  items: Item[];

  @Column({ type: 'float', default: 0 })
  @ApiProperty({ example: 4.5, description: 'Note moyenne du restaurant' })
  rating: number;

  @Column({ length: 100 })
  @ApiProperty({
    example: '08:00-22:00',
    description: "Horaires d'ouverture du restaurant",
  })
  hours: string;

  constructor(partial: Partial<Restaurant>) {
    Object.assign(this, partial);
  }
}
