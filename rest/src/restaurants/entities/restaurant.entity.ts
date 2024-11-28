import { Item } from 'src/items/entities/item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  adresse: string;

  @OneToMany(() => Item, (item) => item.restaurant)
  items: Item[];

  @Column({ type: 'float', nullable: true, default: 0 })
  note?: number;

  @Column({ nullable: true })
  horaires?: string;
}
