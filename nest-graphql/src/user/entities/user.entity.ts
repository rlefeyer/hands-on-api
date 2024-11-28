import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn() // Génère automatiquement une clé primaire
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 50 }) // Déclare une colonne dans la base
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 30, unique: true }) // Colonne avec contrainte d'unicité
  username: string;

  @Field()
  @Column({ type: 'varchar', length: 100, unique: true }) // Email doit être unique
  email: string;

  @Field()
  @Column({ type: 'int' }) // Colonne de type entier
  age: number;

  @Field()
  @Column({ type: 'varchar', length: 255 }) // Mot de passe hashé
  password: string;

  @Field()
  @Column({ type: 'enum', enum: ['m', 'f', 'u'], default: 'u' }) // Enum pour le genre
  gender: string;
}
