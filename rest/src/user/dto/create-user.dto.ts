import {ApiProperty} from "@nestjs/swagger";
import {IsAlphanumeric, IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3, {message: "The name is too short"})
    @IsAlphanumeric(null, {message: "The name must be alphanumeric"})
    @ApiProperty({example: "John"})
    @IsString()
    name: string;

    @IsNotEmpty()
    @MinLength(5, {message: "The address is too short"})
    @IsAlphanumeric(null, {message: "The address must be alphanumeric"})
    @ApiProperty({example: "5 rue de la paix"})
    @IsString()
    adresse: string;

    @IsNotEmpty()
    @MinLength(3, {message: "The password is too short"})
    @IsAlphanumeric(null, {message: "The password must be alphanumeric"})
    @ApiProperty({example: "rijthntrh"})
    password: string;

    @IsNotEmpty()
    @MinLength(10, {message: "The telephone number is too short"})
    @IsAlphanumeric(null, {message: "The telephone number must be alphanumeric"})
    @ApiProperty({example: "0606060606"})
    @IsString()
    telephone: string;
}