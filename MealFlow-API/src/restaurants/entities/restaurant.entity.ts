import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsNumber, MinLength } from 'class-validator';
import { Menu } from 'src/menus/entities/menu.entity';


@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsOptional()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'The name must be at least 3 characters long' }) 
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column({ type: 'varchar', length: 500 })
  @IsNotEmpty()
  @IsString()
  address: string;

  @OneToMany(() => Menu, menu => menu.restaurant, { cascade: true }) 
  @IsOptional()
  @IsArray()
  menus?: Menu[];

  @Column({ type: 'float', nullable: true }) 
  @IsOptional()
  @IsNumber()
  rating?: number;

  @Column({ type: 'varchar', length: 100, nullable: true }) 
  @IsOptional()
  @IsString()
  openingHours?: string;
}
