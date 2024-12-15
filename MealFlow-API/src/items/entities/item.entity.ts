import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identifiant unique de l\'item' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Nom de l\'item' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.menus, { onDelete: 'CASCADE', eager: true })
  @ApiProperty({ description: 'Restaurant auquel l\'item est lié' })
  @IsOptional()
  restaurant: Restaurant;
}
