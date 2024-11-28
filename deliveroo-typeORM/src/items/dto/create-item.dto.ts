import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
} from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    example: 'Pizza Margherita',
    description: "Le nom de l'item (plat ou produit)",
  })
  @IsString()
  @IsNotEmpty({ message: "Le nom de l'item est obligatoire." })
  @MaxLength(100, {
    message: "Le nom de l'item ne peut pas dépasser 100 caractères.",
  })
  name: string;

  @ApiProperty({
    example: 'Une délicieuse pizza garnie de tomates fraîches et de mozzarella',
    description: "Une brève description de l'item",
  })
  @IsString()
  @IsNotEmpty({ message: "La description de l'item est obligatoire." })
  @MaxLength(255, {
    message: "La description de l'item ne peut pas dépasser 255 caractères.",
  })
  description: string;

  @ApiProperty({
    example: 15.99,
    description: "Le prix de l'item en euros",
  })
  @IsNumber({}, { message: 'Le prix doit être un nombre valide.' })
  @IsPositive({ message: 'Le prix doit être supérieur à 0.' })
  price: number;

  @ApiProperty({
    example: 2,
    description: 'La quantité commandée pour cet item',
  })
  @IsNumber({}, { message: 'La quantité doit être un nombre valide.' })
  @IsPositive({ message: 'La quantité doit être un nombre positif.' })
  quantity: number;

  @ApiPropertyOptional({
    example: 1,
    description: "L'ID du menu auquel cet item est associé (si applicable)",
  })
  @IsNumber({}, { message: "L'ID de l'item doit être un nombre valide." })
  @IsPositive({ message: "L'ID de l'item doit être un nombre positif." })
  restaurantId?: number;
}
