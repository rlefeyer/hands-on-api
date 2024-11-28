import { Item } from 'src/items/entities/item.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Menu)
  @JoinTable()
  menus: Menu[];

  @ManyToMany(() => Item)
  @JoinTable()
  items?: Item[];

  @Column('float')
  prix: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
