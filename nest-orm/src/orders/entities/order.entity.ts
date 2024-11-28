import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column("text", { array: true })
  Menus: string[];

  @Column()
  price: string;

  @Column()
  User: string;
}