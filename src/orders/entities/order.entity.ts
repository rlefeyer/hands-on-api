import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ManyToMany(() => Menu)
  @JoinTable()
  @IsNotEmpty()
  @IsArray()
  menus: Menu[];

  @Column("decimal")
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column()
  @OneToMany(() => User, user => user.id)
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}