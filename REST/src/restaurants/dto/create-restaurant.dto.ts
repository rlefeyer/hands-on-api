import { ApiProperty } from "@nestjs/swagger";
import { Menu } from "../../menus/entities/menu.entity";

export class CreateRestaurantDto {
  @ApiProperty({ example: "Magic Merguez", required: true })
  name: string;
  @ApiProperty({
    example: "Le meilleur restaurant de Merguez de Bordeaux",
    required: true,
  })
  description: string;
  @ApiProperty({ example: "322 rue Jacob", required: true })
  address: string;
  @ApiProperty({ example: 5, required: true })
  note: number;
  @ApiProperty({ example: "10h-22h", required: true })
  horaires: string;
  @ApiProperty({ example: [], required: false })
  menus: Menu[] | null;
}
