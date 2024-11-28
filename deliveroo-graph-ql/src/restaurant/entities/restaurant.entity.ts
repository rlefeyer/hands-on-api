import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Id du restaurant' })
  id: number;

  @Column({ length: 100 })
  @Field(() => String, { description: 'Nom du restaurant' })
  name: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, {
    nullable: true,
    description: 'Description du restaurant',
  })
  description?: string;

  @Column({ length: 255 })
  @Field(() => String, { description: 'Adresse du restaurant' })
  address: string;

  @Column({ length: 100 })
  @Field(() => String, { description: 'Catégorie du restaurant' })
  category: string;

  @Column({ type: 'float', default: 0 })
  @Field(() => Number, { description: 'Note moyenne du restaurant' })
  rating: number;

  @Column({ length: 100 })
  @Field(() => String, { description: "Horaires d'ouverture du restaurant" })
  hours: string;
}
