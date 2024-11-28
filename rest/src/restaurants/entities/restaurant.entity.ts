import {Menu} from "../../menus/entities/menu.entity";
import {ApiProperty} from "@nestjs/swagger";
import {IsObject, IsString} from "class-validator";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Restaurant {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: "varchar", length: 30})
    @ApiProperty({example: 'McDo'})
    @IsString()
    name: string;

    @Column({type: "varchar", length: 255})
    @ApiProperty({example: 'Le meilleur fast-food'})
    @IsString()
    description: string;

    @Column({type: "varchar", length: 30})
    @ApiProperty({example: 'fast-food'})
    @IsString()
    categorie: string;

    @Column({type: "varchar", length: 255})
    @ApiProperty({example: '5 rue de la paix'})
    @IsString()
    adresse: string;

    @Column({type: "json" })
    @OneToMany(() => Menu, menu => menu.restaurant)
    @ApiProperty({example: [{id: '1', name: 'MaxiBestOf', description: 'Le meilleur menu de chez McDo', prix: 10, restaurant: 'McDo'}]})
    @IsObject()
    menu: Menu[];

    @Column({type: "int"})
    @ApiProperty({example: 10})
    @IsString()
    note: number;

    @Column({type: "varchar", length: 30})
    @ApiProperty({example: '10h-22h'})
    @IsString()
    horaires: string;
}
