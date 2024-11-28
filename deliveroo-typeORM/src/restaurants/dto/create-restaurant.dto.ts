import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({
    example: 'Le Gourmet',
    description: 'Le nom du restaurant',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le nom du restaurant ne peut pas être vide.' })
  @MaxLength(100, {
    message: 'Le nom du restaurant ne peut pas dépasser 100 caractères.',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Un restaurant gastronomique au cœur de la ville',
    description: 'Une description du restaurant',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500, {
    message:
      'La description du restaurant ne peut pas dépasser 500 caractères.',
  })
  description?: string;

  @ApiProperty({
    example: '123 Rue de Paris, 75001 Paris',
    description: "L'adresse du restaurant",
  })
  @IsString()
  @IsNotEmpty({ message: "L'adresse du restaurant ne peut pas être vide." })
  @MaxLength(255, { message: "L'adresse ne peut pas dépasser 255 caractères." })
  address: string;

  @ApiProperty({
    example: 'Gastronomie française',
    description: 'La catégorie du restaurant',
  })
  @IsString()
  @IsNotEmpty({ message: 'La catégorie du restaurant ne peut pas être vide.' })
  @MaxLength(100, {
    message: 'La catégorie du restaurant ne peut pas dépasser 100 caractères.',
  })
  category: string;

  @ApiPropertyOptional({
    example: 4.5,
    description: 'La note du restaurant sur une échelle de 1 à 5',
  })
  @IsNumber()
  @IsOptional()
  @Min(1, { message: 'La note minimale est 1.' })
  @Max(5, { message: 'La note maximale est 5.' })
  rating?: number;

  @ApiProperty({
    example: '10:00 - 22:00',
    description: "Les horaires d'ouverture du restaurant",
  })
  @IsString()
  @IsNotEmpty({
    message: "Les horaires d'ouverture ne peuvent pas être vides.",
  })
  @MaxLength(100, {
    message: 'Les horaires ne peuvent pas dépasser 100 caractères.',
  })
  hours: string;
}
