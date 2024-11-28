import {ApiProperty} from "@nestjs/swagger";
import {IsObject, IsString} from "class-validator";
import {Restaurant} from "../../restaurants/entities/restaurant.entity";

export class CreateItemDto {

    @ApiProperty({example: "MaxiBestOf"})
    @IsString()
    name: string;

    @ApiProperty({example: "Le meilleur menu de chez McDo"})
    @IsString()
    description: string;

    @ApiProperty({example: 10})
    @IsString()
    prix: number;

    @ApiProperty({
        type: () => [Restaurant],
        description: "The restaurant of the item",
        example: [1],
    })
    @IsObject()
    restaurant: Restaurant;
}
