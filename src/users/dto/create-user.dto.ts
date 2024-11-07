import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nom de l\'utilisateur',
    type: String
  })
  @IsString()
  nom: string;
  @ApiProperty({
    description: 'Prénom de l\'utilisateur',
    type: String
  })
  @IsString()
  adresse: string;
  @ApiProperty({
    description: 'Adresse de l\'utilisateur',
    type: String
  })
  @IsString()
  telephone: string;
}
