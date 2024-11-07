import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class User {
    id: string;

    @ApiProperty({example: 'John'})
    @IsString()
    name: string;

    @ApiProperty({example: '5 rue de la paix'})
    @IsString()
    adresse: string;

    @ApiProperty({example: '0606060606'})
    @IsString()
    telephone: string;

}
