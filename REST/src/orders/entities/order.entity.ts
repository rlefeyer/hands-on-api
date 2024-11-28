import { User } from "../../users/entities/user.entity";
import { Menu } from "../../menus/entities/menu.entity";
import { ApiProperty } from "@nestjs/swagger";

export class Order {
  @ApiProperty()
  id: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  user: User;
  @ApiProperty()
  menus: Menu[];
}
