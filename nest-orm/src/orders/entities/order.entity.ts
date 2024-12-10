import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("text", { array: true })
  menus: string[];

  @Column()
  price: string;

  @Column()
  user: string;
}