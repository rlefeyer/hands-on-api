import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column()
  Address: string;


  @Column("text", { array: true })
  Menus: string[];

  @Column()
  Note: string;

  @Column()
  Schedules: string;
}