import { User } from "src/user/entities/user.entity";
import {Menu} from "../../menus/entities/menu.entity";
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsObject} from "class-validator";

export class CreateOrderDto {

    @ApiProperty({example: [{id: '1', name: 'MaxiBestOf', description: 'Le meilleur menu de chez McDo', prix: 10, restaurant: 'McDo'}]})
    @IsObject()
    order: Menu[];

    @ApiProperty({example: 10})
    @IsNumber()
    prix: number;

    @ApiProperty({example: {name: 'John', adresse: '5 rue de la paix', telephone: '0606060606'}})
    @IsObject()
    User: User;
}
