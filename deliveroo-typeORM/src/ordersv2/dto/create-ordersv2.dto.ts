import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrdersv2Dto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'Les identifiants des items commandés',
  })
  @IsArray({
    message: 'Les identifiants des items doivent être dans un tableau.',
  })
  @ArrayNotEmpty({
    message: 'Le tableau des identifiants des items ne peut pas être vide.',
  })
  @IsNumber(
    {},
    { each: true, message: 'Chaque identifiant doit être un nombre valide.' },
  )
  itemIds: number[];

  @ApiProperty({
    example: 45.99,
    description: 'Le prix total de la commande en euros',
  })
  @IsNumber({}, { message: 'Le prix total doit être un nombre valide.' })
  @IsPositive({ message: 'Le prix total doit être supérieur à 0.' })
  totalPrice: number;

  @ApiProperty({
    example: 1,
    description: "L'identifiant de l'utilisateur passant la commande",
  })
  @IsNumber(
    {},
    { message: "L'identifiant de l'utilisateur doit être un nombre valide." },
  )
  @IsPositive({
    message: "L'identifiant de l'utilisateur doit être supérieur à 0.",
  })
  userId: number;
}
