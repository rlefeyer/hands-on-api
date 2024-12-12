import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 30})
    @ApiProperty({example: "John"})
    @IsString()
    name: string;

    @Column({type: "varchar", length: 30})
    @ApiProperty({example: "azerty123"})
    @IsString()
    password: string;

    @Column({type: "varchar", length: 255})
    @ApiProperty({example: "5 rue de la paix"})
    @IsString()
    adresse: string;

    @Column({type: "varchar", length: 15})
    @ApiProperty({example: "0606060606"})
    @IsString()
    telephone: string;

}
