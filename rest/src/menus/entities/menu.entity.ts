import {Restaurant} from "../../restaurants/entities/restaurant.entity";
import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Menu {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: "varchar", length: 30})
    @ApiProperty({example: 'MaxiBestOf'})
    @IsString()
    name: string;

    @Column({type: "varchar", length: 255})
    @ApiProperty({example: 'Le meilleur menu de chez McDo'})
    @IsString()
    description: string;

    @Column({type: "int"})
    @ApiProperty({example: 10})
    @IsString()
    prix: number;

    @Column({type: "varchar", length: 30})
    @ManyToMany(() => Restaurant, restaurant => restaurant.menu)
    @ApiProperty({example: { name: 'McDo', description: 'Le meilleur fast-food', adresse: '5 rue de la paix', menu: [{id: '1', name: 'MaxiBestOf', description: 'Le meilleur menu de chez McDo', prix: 10, restaurant: 'McDo'}], note: 10, horaires: '10h-22h'}})
    @IsString()
    restaurant: Restaurant;
}
