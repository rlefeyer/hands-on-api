import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";
import {Restaurant} from "../../restaurants/entities/restaurant.entity";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 30})
    @ApiProperty({example: "MaxiBestOf"})
    @IsString()
    name: string;

    @Column({type: "varchar", length: 255})
    @ApiProperty({example: "Le meilleur menu de chez McDo"})
    @IsString()
    description: string;

    @Column({type: "int"})
    @ApiProperty({example: 10})
    @IsString()
    prix: number;

    @ManyToMany(() => Restaurant, restaurant => restaurant.id)
    @JoinTable()
    @ApiProperty({
        type: () => [Restaurant],
        description: "The restaurant of the item",
        example: [{
            id: 1,
            name: "McDo",
            description: "Le meilleur fast-food",
            categorie: "fast-food",
            adresse: "5 rue de la paix",
            menu: [],
            note: 10,
            horaires: "10h-22h",
        }],
    })
    @IsString()
    restaurant: Restaurant;
}
