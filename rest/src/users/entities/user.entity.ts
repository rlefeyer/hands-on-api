import { Role } from 'src/auth/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: Role.USER })
  role: Role;
}
