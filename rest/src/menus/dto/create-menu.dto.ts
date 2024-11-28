import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateMenuDto {

    @ApiProperty({example: 'MaxiBestOf'})
    @IsString()
    name: string;

    @ApiProperty({example: 'Le meilleur menu de chez McDo'})
    @IsString()
    description: string;

    @ApiProperty({example: 10})
    @IsString()
    prix: number;

    @ApiProperty({example: 'McDo'})
    @IsString()
    restaurant: string;
}
