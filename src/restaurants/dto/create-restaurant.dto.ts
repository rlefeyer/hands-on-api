import {Menu} from "../../menus/entities/menu.entity";
import {IsObject, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRestaurantDto {

    @ApiProperty({example: 'McDo'})
    @IsString()
    name: string;

    @ApiProperty({example: 'Le meilleur fast-food'})
    @IsString()
    description: string;

    @ApiProperty({example: 'fast-food'})
    @IsString()
    categorie: string;

    @ApiProperty({example: '5 rue de la paix'})
    @IsString()
    adresse: string;

    @ApiProperty({example: [{id: '1', name: 'MaxiBestOf', description: 'Le meilleur menu de chez McDo', prix: 10, restaurant: 'McDo'}]})
    @IsObject()
    menu: Menu[];

    @ApiProperty({example: 10})
    @IsString()
    note: number;

    @ApiProperty({example: '10h-22h'})
    @IsString()
    horaires: string;

}
