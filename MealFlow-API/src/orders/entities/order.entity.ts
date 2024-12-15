import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Item } from 'src/items/entities/item.entity';



@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ManyToMany(() => Item, Item => Item.id)
  @JoinTable()
  @IsNotEmpty()
  @IsArray()
  items: Item[];

  @Column("decimal")
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

