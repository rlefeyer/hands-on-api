import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray } from 'class-validator';
import { Role } from 'src/auth/role.enum';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsOptional()
  id: number;

  @Column({ type: 'varchar', length: 255 }) 
  @IsString()
  @IsNotEmpty()
  name: string;

  //Password
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  password: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  address: string;

  @Column({ type: 'varchar', length: 15 })
  @IsString()
  phone: string;

  @Column({ type: 'varchar', length: 15 })
  roles: string;
}
