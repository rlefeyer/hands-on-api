import { Restaurant } from "../../restaurants/entities/restaurant.entity";
import { ApiProperty } from "@nestjs/swagger";

export class Item {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  restaurant: Restaurant;
}
