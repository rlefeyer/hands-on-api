import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 }) // Déclare une colonne dans la base
  name: string;

  @Column({ type: 'varchar', length: 30, unique: true }) // Colonne avec contrainte d'unicité
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true }) // Email doit être unique
  email: string;

  @Column({ type: 'int' }) // Colonne de type entier
  age: number;

  @Column({ type: 'varchar', length: 255 }) // Mot de passe hashé
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  gender: string;
}