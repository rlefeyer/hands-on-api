import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";
import {Restaurant} from "../../restaurants/entities/restaurant.entity";

export class CreateItemDto {

    @ApiProperty({example: 'MaxiBestOf'})
    @IsString()
    name: string;

    @ApiProperty({example: 'Le meilleur menu de chez McDo'})
    @IsString()
    description: string;

    @ApiProperty({example: 10})
    @IsString()
    prix: number;

    @ApiProperty({example: { name: 'McDo', description: 'Le meilleur fast-food', adresse: '5 rue de la paix', menu: [{id: '1', name: 'MaxiBestOf', description: 'Le meilleur menu de chez McDo', prix: 10, restaurant: 'McDo'}], note: 10, horaires: '10h-22h'}})
    @IsString()
    restaurant: Restaurant;
}
