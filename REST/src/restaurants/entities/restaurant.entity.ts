import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Menu } from '../../menus/entities/menu.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  address: string;

  @Column()
  @ApiProperty()
  note: number;

  @Column()
  @ApiProperty()
  horaires: string;

  @OneToMany(() => Menu, menu => menu.restaurant)
  @ApiProperty({ type: () => Menu, isArray: true })
  menus: Menu[];
}