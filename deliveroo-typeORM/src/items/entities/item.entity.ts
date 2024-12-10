import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Identifiant de l'item" })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ example: 'Pizza Margherita', description: "Nom de l'item" })
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiPropertyOptional({
    example: 'Une délicieuse pizza garnie de tomates fraîches et de mozzarella',
    description: "Description de l'item",
  })
  description?: string;

  @Column({ type: 'float' })
  @ApiProperty({
    example: 12.99,
    description: "Prix unitaire de l'item en euros",
  })
  price: number;

  @Column({ type: 'int' })
  @ApiProperty({ example: 2, description: "Quantité de l'item commandée" })
  quantity: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurantId' })
  @ApiProperty({
    description: 'Référence au restaurant auquel cet item est associé',
    type: () => Restaurant,
  })
  restaurant: Restaurant;

  @Column({ type: 'int' })
  restaurantId: number;

  constructor(partial: Partial<Item>) {
    Object.assign(this, partial);
  }
}
