// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

// @Entity()
export class Menu {
  // @PrimaryGeneratedColumn()
  // @ApiProperty({ example: 1, description: 'Identifiant du menu' })
  // id: number;

  // @Column({ length: 100 })
  // @ApiProperty({ example: 'Menu 1', description: 'Nom du menu' })
  // name: string;

  // @Column({ type: 'text', nullable: true })
  // @ApiPropertyOptional({
  //   example: 'Description du menu 1',
  //   description: 'Description du menu',
  // })
  // description?: string;

  // @Column({ type: 'float' })
  // @ApiProperty({ example: 10.99, description: 'Prix du menu' })
  // price: number;

  // @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, {
  //   onDelete: 'CASCADE',
  // })
  // @ApiProperty({
  //   description: 'Restaurant auquel appartient le menu',
  //   type: () => Restaurant,
  // })
  // restaurant: Restaurant;

  constructor(partial: Partial<Menu>) {
    Object.assign(this, partial);
  }
}
