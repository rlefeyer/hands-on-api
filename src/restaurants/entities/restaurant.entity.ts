import { Menu } from "../../menus/entities/menu.entity";
import { ApiProperty } from "@nestjs/swagger";

export class Restaurant {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  note: number;
  @ApiProperty()
  horaires: string;
  @ApiProperty()
  menus: Menu[];
}
