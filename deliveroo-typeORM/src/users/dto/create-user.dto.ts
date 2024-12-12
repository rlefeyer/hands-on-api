import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  MaxLength,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: "Le nom complet de l'utilisateur",
  })
  @IsString()
  @IsNotEmpty({ message: 'Le nom ne peut pas être vide.' })
  @MaxLength(100, { message: 'Le nom ne peut pas dépasser 100 caractères.' })
  name: string;

  @ApiProperty({
    example: 'Gre@tP@ssw0rd',
    description: "Le mot de passe de l'utilisateur",
  })
  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe ne peut pas être vide.' })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  @MaxLength(20, { message: 'Le mot de passe ne peut pas dépasser 20 caractères.' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;

  @ApiProperty({
    example: '123 Rue de Paris, 75001 Paris',
    description: "L'adresse complète de l'utilisateur",
  })
  @IsString()
  @IsNotEmpty({ message: "L'adresse ne peut pas être vide." })
  @MaxLength(255, { message: "L'adresse ne peut pas dépasser 255 caractères." })
  address: string;

  @ApiProperty({
    example: '+33123456789',
    description: "Le numéro de téléphone de l'utilisateur",
  })
  @IsPhoneNumber('FR', { message: 'Le numéro de téléphone doit être valide.' })
  phone: string;
}
