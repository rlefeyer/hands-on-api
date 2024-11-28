import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'Les identifiants des menus commandés',
  })
  menuIds: number[];

  @ApiProperty({
    example: 45.99,
    description: 'Le prix total de la commande en euros',
  })
  totalPrice: number;

  @ApiProperty({
    example: 1,
    description: "L'identifiant de l'utilisateur passant la commande",
  })
  userId: number;
}
