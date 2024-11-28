import { ApiProperty } from '@nestjs/swagger';

export class CancelOrderDto {
  @ApiProperty({
    example: 1,
    description: "L'identifiant de la commande à annuler",
  })
  id: number;
}
