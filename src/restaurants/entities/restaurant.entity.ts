import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsNumber } from 'class-validator';
import { Menu } from 'src/menus/entities/menu.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  address: string;

  @OneToMany(() => Menu, menu => menu.restaurant)
  @IsOptional()
  @IsArray()
  menus?: Menu[];

  @Column({ type: 'float', nullable: true })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  openingHours?: string;
}