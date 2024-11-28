import {PartialType} from "@nestjs/mapped-types";
import {CreateUserDto} from "./create-user.dto";
import {IsAlphanumeric, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @MinLength(3, {message: "The name is too short"})
    @IsAlphanumeric(null, {message: "The name must be alphanumeric"})
    @ApiProperty({example: "John"})
    @IsString()
    name: string;
    
    @MinLength(5, {message: "The address is too short"})
    @IsAlphanumeric(null, {message: "The address must be alphanumeric"})
    @ApiProperty({example: "5 rue de la paix"})
    @IsString()
    adresse: string;

    @MinLength(10, {message: "The telephone number is too short"})
    @IsAlphanumeric(null, {message: "The telephone number must be alphanumeric"})
    @ApiProperty({example: "0606060606"})
    @IsString()
    telephone: string;
}
